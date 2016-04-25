package handlers

import (
	"bytes"
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/stretchr/testify/assert"

	"github.com/Icelandair/micro.static-content/models"
)

var (
	downstreamSrv *httptest.Server
	method        string
	path          string
	request       models.ContractRequest
	response      models.ContractResponse
	reader        io.Reader
	db            *gorm.DB
	dbFile        *os.File
)

func setup(contractFile string) {
	var err error
	dbFile, err = ioutil.TempFile("", "staticContent-")
	if err != nil {
		panic(err)
	}
	db, err = gorm.Open("sqlite3", dbFile.Name())
	if err != nil {
		panic(err)
	}
	dnMux := NewRouter(db)
	downstreamSrv = httptest.NewServer(dnMux)
	path, method, request, response = models.ReadContract(contractFile)
}

func teardown() {
	downstreamSrv.Close()
	db.Close()
	dbFile.Close()
	err := os.Remove(dbFile.Name())
	if err != nil {
		panic(err)
	}
}

func TestBadRequest(t *testing.T) {
	setup("../contracts/downstream/beta.icelandairlabs.com/bad-request.json")
	defer teardown()

	// When
	db.AutoMigrate(&models.ContentItem{})

	// Then
	var expected, actual models.Error
	content, statusCode := MakeRequest(t, &expected, &actual)

	// Should
	assert.Equal(t, response.Status, statusCode)
	assert.EqualValues(t, expected, actual, "JSON: `%s`", content)
}

func TestDoesNotExist(t *testing.T) {
	setup("../contracts/downstream/beta.icelandairlabs.com/does-not-exist.json")
	defer teardown()

	// When
	db.AutoMigrate(&models.ContentItem{})

	// Then
	var expected, actual models.Error
	content, statusCode := MakeRequest(t, &expected, &actual)

	// Should
	assert.EqualValues(t, expected, actual, "JSON: `%s`", content)
	assert.EqualValues(t, response.Status, statusCode)
}

func TestGetData(t *testing.T) {
	setup("../contracts/downstream/beta.icelandairlabs.com/get-data.json")
	defer teardown()

	// When
	db.AutoMigrate(&models.ContentItem{})
	db.Create(&models.ContentItem{
		ContentID: "TestId",
		Text:      "Lorem ipsum dolor sit amet",
		Comment:   "Optionally empty comment",
	})

	// Then
	var expected, actual models.ContentItem
	content, statusCode := MakeRequest(t, &expected, &actual)

	// Should
	assert.EqualValues(t, expected, actual, "JSON: `%s`", content)
	assert.EqualValues(t, response.Status, statusCode)
}

// MakeRequest performs the endpoint request and marshals the data into `expected` and `actual` wich must be pointers to models
func MakeRequest(t *testing.T, expected, actual interface{}) (content string, statusCode int) {
	url := downstreamSrv.URL + path
	req, err := http.NewRequest(method, url, reader)
	if err != nil {
		panic(err)
	}
	res, err := http.DefaultClient.Do(req)
	statusCode = res.StatusCode
	if err != nil {
		panic(err)
	}
	buf := new(bytes.Buffer)
	buf.ReadFrom(res.Body)
	b, err := json.Marshal(response.Content)
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal(b, expected)
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal(buf.Bytes(), actual)
	content = buf.String()
	if err != nil {
		t.Fatalf("Failed to `%s` %s: the response was `%v`: %v",
			method, downstreamSrv.URL+path, content, err)
	}
	return content, statusCode
}
