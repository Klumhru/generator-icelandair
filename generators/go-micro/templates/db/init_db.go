package db

import (
	"fmt"
	"log"
	"net/url"
	"os"
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres" // use postgres dialect
)

// InitDB connect to, initialize and AutoMigrate the database
func InitDB() *gorm.DB {
	connString := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		os.Getenv("DB_USER"),
		url.QueryEscape(os.Getenv("DB_PASS")),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	log.Printf("Connecting to database: %s:%s/%s\n",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	count, retries := 0, 30
	db, err := gorm.Open("postgres", connString)
	for err != nil && count < retries {
		log.Printf("Retrying database connection after error: %v\n", err)
		time.Sleep(time.Second * 1)
		db, err = gorm.Open("postgres", connString)
		count++
	}

	if err != nil {
		log.Fatalf("Got error when connect database, the error is '%v'", err)
	}

	dbResult := db.AutoMigrate(&SomeDBModel{})
	if err != nil {
		log.Fatalf("Error during database migration for SomeDBModel: %v\n", dbResult.Error)
	}

	dbResult = db.Model(&SomeDBModel{}).AddForeignKey("self_reference_id", "some_db_model(id)", "RESTRICT", "RESTRICT")
	if dbResult.Error != nil {
		log.Printf("Error adding self referencing link to SomeDBModel: %v\n", dbResult.Error)
	}

	return db
}
