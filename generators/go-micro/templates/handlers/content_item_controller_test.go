package handlers

import (
	"io"
	"net/http/httptest"
	"testing"

	baseMiddleware "github.com/Icelandair/go.base/middleware"

	"github.com/Icelandair/micro.testing/contracts"
	"github.com/Icelandair/micro.testing/integration_testing"
	"github.com/Icelandair/micro.testing/mocker"
	"github.com/codegangsta/negroni"

	. "gopkg.in/check.v1"
)

var (
	contentItem      *ContentItemContext
	server           *httptest.Server
	reader           io.Reader
	upstreamProvider *httptest.Server
)

func setup(c *C) *httptest.Server {

	upstreamProvider = mocker.MockContracts("../contracts/upstream")

	contentItem = NewContentItemContext(upstreamProvider.URL)

	router := NewRouter(upstreamProvider.URL + "/api/v1/provider")

	n := negroni.New(negroni.NewRecovery())

	n.Use(baseMiddleware.NewLogger("<%= camelProjectName %>"))
	n.Use(baseMiddleware.NewRequiredCorrelationTestID())

	n.UseHandler(router)

	server = httptest.NewServer(n)
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
