package handlers

import (
	"net/http"

	"github.com/Icelandair/micro.static-content/models"
	"github.com/unrolled/render"
)

// ContentItemContext contains stuff and has methods hooked on
type ContentItemContext struct {
	render *render.Render
}

// NewContentItemContext instance
func NewContentItemContext() *ContentItemContext {
	c := Context{}
	c.render = render.New()
	return &c
}

// Handle returns 'Status: 200' and 'Body: { "Text": "Some Text" }'
func (c *ContentItemContext) Handle(w http.ResponseWriter, r *http.Request) {
	var item models.ContentItem
	item.Text = "Some text"

	c.render.JSON(w, http.StatusOK, item)
}

// Generate500Error returns a 500 error
func (c *ContentItemContext) Generate500Error(w http.ResponseWriter, r *http.Request) {
	var error models.Error
	error.Code = 500
	error.Message = "Fake 500 error"

	c.render.JSON(w, http.StatusInternalServerError, error)
}
