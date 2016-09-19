package db

// SomeDBModel for storing in the db
// Creates a table with a composite primary key and a unique key for the id
type SomeDBModel struct {
	ID              string `gorm:"type: uuid;unique;primary_key;default:uuid_generate_v1()"`
	FooID           string `gorm:"type: uuid;primary_key"`
	SomeString      string `gorm:"type: character varying"`
	SelfReferenceID string `gorm:"type: uuid;index"`
}
