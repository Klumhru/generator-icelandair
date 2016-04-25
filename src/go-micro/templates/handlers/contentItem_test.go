package handlers

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
	"text/template"

	baseHandlers "github.com/Icelandair/micro.base/handlers"
	baseMiddleware "github.com/Icelandair/micro.base/middleware"
	"github.com/Icelandair/<%= gitRepo %>/models"
	"github.com/Icelandair/micro.testing/contracts"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"

	. "gopkg.in/check.v1"
)

var (
	contentItem *JobApplicationContext
	server         *httptest.Server
	reader         io.Reader
)

func setup(c *C) *httptest.Server {
	contentItem = NewContentItemContext()

	router := mux.NewRouter()
	router.Methods("GET").Path("/item").HandlerFunc(contentItem.Handle)

	root := NewRootContext()
	router.Methods("GET").Path("/").HandlerFunc(root.Get)

	health := baseHandlers.NewHealthContext()
	router.HandleFunc("/health", health.Handle)

	mux := NewMux(&db, tpl, emailClient)

	n := negroni.New()

	n.Use(baseMiddleware.NewCorrelationTestID())

	n.UseHandler(mux)

	server = httptest.NewServer(n)
	return server
}

func teardown() {
	server.Close()
}

func Test(t *testing.T) {
	TestingT(t)
}



type ContractSuite struct {
}

var _ = Suite(&ContractSuite{})

func (s *ContractSuite) TestContract(c *C) {
	// TODO garpur 2016-05-20 This needs a rewrite  NOW !
	// contracttest.TestContracts(s, c, "../contracts/downstream/SomeConsumer/contract.yml", setup, teardown)
}
