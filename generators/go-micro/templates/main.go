package main

import (
	"fmt"
	"os"
	"time"

  baseMiddleware "github.com/Icelandair/go.base/middleware"
	"github.com/<%= gitRepo %>/db"
  "github.com/<%= gitRepo %>/handlers"
  "github.com/<%= gitRepo %>/utils"
	"github.com/codegangsta/negroni"
  _ "github.com/lib/pq" // Postgres driver
	"github.com/tylerb/graceful"
)

func main() {
  serviceName := "<%= camelProjectName %>"
  // todo if need for db, else remove
  fetcher := &db.SomeDBModelAccess{
    Database: db.InitDB(),
  }

  runtimeEnvironment := fmt.Sprintf("%s", os.Getenv("RUNTIME_ENVIRONMENT"))
  logger := baseMiddleware.NewLogger(serviceName, runtimeEnvironment)

  n := negroni.New(negroni.NewRecovery())
  // todo add or remove client to e.g. webservice
  mux := handlers.NewRouter("Url to client e.g. http://www.icelandair.is/servlet/rest/labs", serviceName, runtimeEnvironment, *logger, fetcher)
  n.Use(logger)

  n.Use(baseMiddleware.NewRequiredCorrelationID(serviceName, runtimeEnvironment))

  n.Use(baseMiddleware.NewRequiredLanguageID())

  n.UseHandler(mux)

  host := fmt.Sprintf("%s:%s", os.Getenv("HOSTNAME"), os.Getenv("PORT"))
  message := fmt.Sprintf("Starting service on %s\n", host)
  fields := utils.GetLogMessage(serviceName, "-1","-1", "main", runtimeEnvironment, nil)
  logger.Logger.WithFields(fields).Info(message)

  graceful.Run(host, 10*time.Second, n)
}
