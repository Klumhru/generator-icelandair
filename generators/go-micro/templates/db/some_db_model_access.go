package db

import (
	"fmt"

	"github.com/<%= gitRepo %>/models"
	"github.com/jinzhu/gorm"
)

// SomeDBModelAccess fetches data from the actual database
type SomeDBModelAccess struct {
	Database *gorm.DB
}

// GetBAR returns something
func (db *SomeDBModelAccess) GetBAR(ID string) []models.ContentItem {
	return transformBAR(getBAR(db.Database, ID))
}

func getBAR(db *gorm.DB, ID string) []SomeDBModel {
	var foo []SomeDBModel

	db.Debug()./*Preload("Some link table").*/Where("id = ?", ID).Find(&foo)

	for i := range foo {
		fmt.Printf("BAR: %v \n", foo[i])
	}

	return foo
}

func transformBAR(bar []SomeDBModel) []models.ContentItem {
	var result []models.ContentItem

	for _, val := range bar {
		result = append(result, models.ContentItem{
			Text:  val.SomeString,
		})
	}

	return result
}
