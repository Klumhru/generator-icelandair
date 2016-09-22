package handlers

import (
  "github.com/Icelandair/go.base/handlers"
  "github.com/<%= gitRepo %>/db"
  "github.com/gorilla/mux"
  baseHandlers "github.com/Icelandair/go.base/middleware"
)

// NewRouter returns a new router for the service
func NewRouter(upstreamProviderURL string, name string, runtimeEnvironment string, logger baseHandlers.Logger, fetcher db.SomeDBModelAccesser) *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	contentItem := NewContentItemContext(upstreamProviderURL, name, runtimeEnvironment, logger, fetcher)

	health := handlers.NewHealthContext()
	router.HandleFunc("/api/v1/<%= camelProjectName %>/health/", health.Handle)

	router.Methods("GET").Path("/api/{id:v[0-9]+}/<%= camelProjectName %>/item/").HandlerFunc(contentItem.Handle)
	router.Methods("GET").Path("/api/{id:v[0-9]+}/<%= camelProjectName %>/error/").HandlerFunc(contentItem.Generate500Error)
	router.Methods("GET").Path("/api/{id:v[0-9]+}/<%= camelProjectName %>/").HandlerFunc(contentItem.Handle)


	return router
}
