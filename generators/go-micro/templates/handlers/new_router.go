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


	router.Methods("GET").Path("/api/{id:v[0-9]+}/<%= camelProjectName %>/item/").HandlerFunc(contentItem.Handle)
	router.Methods("GET").Path("/api/{id:v[0-9]+}/<%= camelProjectName %>/").HandlerFunc(contentItem.Handle)

  health := handlers.NewHealthContext()
	router.HandleFunc("/health", health.Handle)
	router.HandleFunc("/health/", health.Handle)

	return router
}
