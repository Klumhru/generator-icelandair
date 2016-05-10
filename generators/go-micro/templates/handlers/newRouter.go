package handlers

import "github.com/gorilla/mux"

// NewRouter returns a new router for the service
func NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	contentItem := NewContentItemContext()

	router.Methods("GET").Path("/item").HandlerFunc(contentItem.Handle)
	router.Methods("GET").Path("/error").HandlerFunc(contentItem.Generate500Error)

	return router
}
