package handlers

import (
	"io"
	"net/http/httptest"
	"testing"

	baseMiddleware "github.com/Icelandair/go.base/middleware"

	"github.com/Icelandair/micro.testing/contracts"
  "github.com/Icelandair/<%= gitRepo %>/db"
	"github.com/Icelandair/micro.testing/integration_testing"
	"github.com/Icelandair/micro.testing/mocker"
	"github.com/codegangsta/negroni"

	. "gopkg.in/check.v1"
  "os"
  "fmt"
  "github.com/Icelandair/<%= gitRepo %>/utils"
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
  mux := NewRouter(serviceName, runtimeEnvironment, *logger, fetcher)

	n := negroni.New(negroni.NewRecovery())
  n.Use(baseMiddleware.NewRequiredCorrelationTestID(serviceName, runtimeEnvironment))
  n.Use(baseMiddleware.NewRequiredLanguageID())
  n.UseHandler(mux)

  server = httptest.NewServer(n)
  host := fmt.Sprintf("%s:%s", os.Getenv("HOST"), os.Getenv("PORT"))
  message := fmt.Sprintf("Starting service on %s\n", host)
  nodeName := fmt.Sprintf("%s\n", os.Getenv("HOSTNAME"))
  fields := utils.GetServerMessage(nodeName, serviceName, "controllerTest", runtimeEnvironment)
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

func (s *TestSuite) TestIntegrationContract(c *C) {
	contracts.TestContracts(s, c, "../contracts/downstream", setup, teardown)
}

func (s *TestSuite) TestEndToEndContract(c *C) {
	// Skip end to end tests when short -- ie local dev
	if !testing.Short() {
		integrationTesting.IntegrationTestContracts(s, c, "../contracts/downstream/", setup, teardown)
	}
}
