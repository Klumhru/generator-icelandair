package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/Icelandair/micro.base/middleware"
	"github.com/<%= gitRepo %>/handlers"
	"github.com/codegangsta/negroni"

	"github.com/tylerb/graceful"
)

var (
	connString string
)

func main() {
	n := negroni.Classic()
	log.Printf("Initializing service")

	mux := handlers.NewRouter()
	n.Use(middleware.NewCorrelationID())
	n.Use(middleware.NewLogger("<%= camelProjectName %>"))
	n.UseHandler(mux)

	host := fmt.Sprintf("%s:%s", os.Getenv("HOST"), os.Getenv("PORT"))
	log.Printf("Starting service on %s\n", host)
	graceful.Run(host, 10*time.Second, n)
}
