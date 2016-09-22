package handlers

import (
	"net/http"

	"github.com/Icelandair/<%= gitRepo %>/clients"
	"github.com/Icelandair/<%= gitRepo %>/models"
	"github.com/unrolled/render"

  "github.com/Icelandair/<%= gitRepo %>/db"
  "github.com/gorilla/mux"
  "github.com/Icelandair/go.base/middleware"
  "github.com/Icelandair/<%= gitRepo %>/utils"

)

// ContentItemContext contains stuff and has methods hooked on
type ContentItemContext struct {
	upstreamClient *clients.UpstreamProviderClient
	render *render.Render
  routes db.<%= camelProjectName %>/Accesser
  logger *middleware.Logger
  name string
  runtimeEnvironment string

}

// NewContentItemContext instance
func NewContentItemContext(upstreamProviderURL string, name string, runtimeEnvironment string, logger middleware.Logger, routes db.<%= camelProjectName %>/Accesser) *ContentItemContext {
	c := ContentItemContext{}
	c.upstreamClient = clients.NewUpstreamProviderClient(upstreamProviderURL)
	c.render = render.New()
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
