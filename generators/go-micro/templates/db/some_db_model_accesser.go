package db

import "github.com/<%= gitRepo %>/models"

// SomeDBModelAccesser interface for route access
type SomeDBModelAccesser interface {
	GetBAR(ID string) []models.ContentItem
}
