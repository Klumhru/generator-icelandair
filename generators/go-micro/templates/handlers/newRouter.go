package handlers

import (
	baseHandlers "github.com/Icelandair/go.base/handlers"
	"github.com/gorilla/mux"
)

// NewRouter returns a new router for the service
func NewRouter(upstreamProviderURL string) *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	contentItem := NewContentItemContext(upstreamProviderURL)

	router.Methods("GET").Path("//api/{id:v[0-9]+}/").HandlerFunc(contentItem.Handle)
	router.Methods("GET").Path("/item/").HandlerFunc(contentItem.Handle)
	router.Methods("GET").Path("/error/").HandlerFunc(contentItem.Generate500Error)

	health := baseHandlers.NewHealthContext()
	router.HandleFunc("/health/", health.Handle)

	return router
}
