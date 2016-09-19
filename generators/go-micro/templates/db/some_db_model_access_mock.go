package db

import 	"github.com/<%= gitRepo %>/models"

// SomeDBModelAccessMock mock for testing
type SomeDBModelAccessMock struct {
}

// GetBAR returns mock data for tests
func (*SomeDBModelAccessMock) GetBAR(ID string) []models.ContentItem {
	if ID == "600e4567-e89b-12d3-a456-426655440000" {
		mockData := make([]models.ContentItem, 1)
		mockData[0].Text = "100e4567-e89b-12d3-a456-426655440000"
		return mockData
	}
	return nil
}
