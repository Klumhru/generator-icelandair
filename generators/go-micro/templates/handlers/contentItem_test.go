package handlers

import (
	"io"
	"net/http/httptest"
	"testing"

	baseMiddleware "github.com/Icelandair/micro.base/middleware"

	"github.com/Icelandair/micro.testing/contracts"
	"github.com/codegangsta/negroni"

	. "gopkg.in/check.v1"
)

var (
	contentItem *ContentItemContext
	server      *httptest.Server
	reader      io.Reader
)

func setup(c *C) *httptest.Server {
	contentItem = NewContentItemContext()

	router := NewRouter()

	n := negroni.New()

	n.Use(baseMiddleware.NewCorrelationTestID())

	n.UseHandler(router)

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
	contracts.TestContracts(s, c, "../contracts/downstream", setup, teardown)
}
