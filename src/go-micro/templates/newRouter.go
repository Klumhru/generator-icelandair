package handlers

import (
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

// NewRouter returns a new router for the service
func NewRouter(db *gorm.DB) *mux.Router {
	r := mux.NewRouter().StrictSlash(true)
	c := NewContentItemContext(db)

	r.HandleFunc("/", c.HandleContentID).Methods("GET")

	r.HandleFunc("/{contentId}/", c.HandleContentID).Methods("GET")

	return r
}
