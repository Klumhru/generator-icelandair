package handlers

import (
	"io"
	"net/http/httptest"
	"testing"

	baseMiddleware "github.com/Icelandair/go.base/middleware"

	"github.com/Icelandair/micro.testing/contracts"
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

	n.Use(middleware.NewLogger("<%= camelProjectName %>"))
	n.Use(baseMiddleware.NewCorrelationTestID())

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

type ContractSuite struct {
}

var _ = Suite(&ContractSuite{})

func (s *ContractSuite) TestContract(c *C) {
	contracts.TestContracts(s, c, "../contracts/downstream", setup, teardown)
}
