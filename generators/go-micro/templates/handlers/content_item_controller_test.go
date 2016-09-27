package handlers

import (
	"io"
	"net/http/httptest"
	"testing"

	baseMiddleware "github.com/Icelandair/go.base/middleware"

	"github.com/Icelandair/go.testing/contracts"
  "github.com/<%= gitRepo %>/db"
	"github.com/Icelandair/go.testing/integration_testing"
	"github.com/Icelandair/go.testing/mocker"
	"github.com/codegangsta/negroni"

	. "gopkg.in/check.v1"
  "os"
  "fmt"
  "github.com/<%= gitRepo %>/utils"
)

var (
	contentItem      *ContentItemContext
	server           *httptest.Server
	reader           io.Reader
	upstreamProvider *httptest.Server
)

func setup(c *C) *httptest.Server {
  serviceName := "<%= camelProjectName %>"

	upstreamProvider = mocker.MockContracts("../contracts/upstream")
  // todo remove if no use for db
  fetcher := &db.SomeDBModelAccessMock{}
  runtimeEnvironment := fmt.Sprintf("%s", os.Getenv("RUNTIME_ENVIRONMENT"))
  logger := baseMiddleware.NewLogger(serviceName, runtimeEnvironment)
  mux := NewRouter(upstreamProvider.URL, serviceName, runtimeEnvironment, *logger, fetcher)

	n := negroni.New(negroni.NewRecovery())
  n.Use(baseMiddleware.NewRequiredCorrelationTestID(serviceName, runtimeEnvironment))
  n.Use(baseMiddleware.NewRequiredLanguageID())
  n.UseHandler(mux)

  server = httptest.NewServer(n)
  host := fmt.Sprintf("%s:%s", os.Getenv("HOSTNAME"), os.Getenv("PORT"))
  message := fmt.Sprintf("Starting service on %s\n", host)
  fields := utils.GetLogMessage(serviceName, "-1","-1", "main", runtimeEnvironment, nil)
  logger.Logger.WithFields(fields).Info(message)

  return server
}

func teardown() {
	upstreamProvider.Close()
	server.Close()
}

func Test(t *testing.T) {
	TestingT(t)
}

type TestSuite struct {
}

var _ = Suite(&TestSuite{})

func (s *TestSuite) TestIntegrationHealth(c *C) {
	server := setup(c)
	defer teardown()
	if server == nil {
		panic("server is nil")
	}

	req, _ := http.NewRequest("GET", server.URL+"/health/", nil)
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		c.Errorf("\nGot error requesting /health/, err: %v\n", err)
	}
	c.Check(res.StatusCode, Equals, http.StatusOK, Commentf("testing: /health/, %v", res))
}

func (s *TestSuite) TestIntegrationContract(c *C) {
	contracts.TestContracts(s, c, "../contracts/downstream", setup, teardown)
}

func (s *TestSuite) TestEndToEndContract(c *C) {
	// Skip end to end tests when short -- ie local dev
	if !testing.Short() {
		integrationTesting.IntegrationTestContracts(s, c, "../contracts/downstream/", setup, teardown)
	}
}
