package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/Icelandair/go.base/middleware"
	"github.com/<%= gitRepo %>/handlers"
	"github.com/codegangsta/negroni"

	"github.com/tylerb/graceful"
)

var (
	connString string
)

func main() {
	n := negroni.New(negroni.NewRecovery())
	log.Println("Initializing service")

	mux := handlers.NewRouter("some url to an actual service")
  n.Use(middleware.NewLogger("<%= camelProjectName %>"))
  n.Use(middleware.NewCorrelationID())
  //n.Use(middleware.NewRequiredLanguageID())
  //n.Use(middleware.NewRequiredLocationID())
  n.UseHandler(mux)

	host := fmt.Sprintf("%s:%s", os.Getenv("HOST"), os.Getenv("PORT"))
	log.Printf("Starting service on %s\n", host)
	graceful.Run(host, 10*time.Second, n)
}
