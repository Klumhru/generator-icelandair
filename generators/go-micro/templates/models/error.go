package models

// Error is a struct that reports an error
type Error struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}
