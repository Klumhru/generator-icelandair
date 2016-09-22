package handlers

import (
	"net/http"

	"github.com/<%= gitRepo %>/clients"
	"github.com/<%= gitRepo %>/models"
	"github.com/unrolled/render"

  "github.com/<%= gitRepo %>/db"
  baseMiddleware "github.com/Icelandair/go.base/middleware"
  "github.com/<%= gitRepo %>/utils"

)

// ContentItemContext contains stuff and has methods hooked on
type ContentItemContext struct {
	upstreamClient *clients.UpstreamProviderClient
	render *render.Render
  fetcher db.SomeDBModelAccesser
  logger *baseMiddleware.Logger
  name string
  runtimeEnvironment string

}

// NewContentItemContext instance
func NewContentItemContext(upstreamProviderURL string, name string, runtimeEnvironment string, logger baseMiddleware.Logger, fetcher db.SomeDBModelAccesser) *ContentItemContext {
	c := ContentItemContext{}
	c.upstreamClient = clients.NewUpstreamProviderClient(upstreamProviderURL)
	c.render = render.New()
  c.fetcher = fetcher
  c.logger = &logger
  c.name = name
  c.runtimeEnvironment = runtimeEnvironment
  return &c
}

// Handle returns 'Status: 200' and 'Body: { "Text": "Some upstream text" }'
func (c *ContentItemContext) Handle(w http.ResponseWriter, r *http.Request) {
	var item models.ContentItem
	item.Text = c.upstreamClient.GetItem()
  // ATN. is there neeed to have timeout between services eg. when connection to webmethods?
  // adding logging
  fields := utils.GetLogMessage(c.name, "some info e.g. siteid", "more info", "NameOfMethod e.g. Handle in this case", c.runtimeEnvironment, r)
  c.logger.Logger.WithFields(fields).Debug("Find site tree")
  c.render.JSON(w, http.StatusOK, item)
}

// Generate500Error returns a 500 error
func (c *ContentItemContext) Generate500Error(w http.ResponseWriter, r *http.Request) {
	var error models.Error
	error.Code = 500
	error.Message = "Fake 500 error"
  fields := utils.GetLogMessage(c.name, "some info e.g. siteid", "more info", "NameOfMethod e.g. Generate500Error in this case", c.runtimeEnvironment, r)
  c.logger.Logger.WithFields(fields).Error(error.Message)
	c.render.JSON(w, http.StatusInternalServerError, error)
}
