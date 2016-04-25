package models

// ContentItem is a simple text structure with message and comment
type ContentItem struct {
	ContentID string `json:"contentId"         gorm:"column:contentId;type:character varying(250);unique;not null"`
	Text      string `json:"text"              gorm:"column:content;type:text"`
	Comment   string `json:"comment,omitempty" gorm:"column:comment;type:text"`
}

// TableName customizes the table name for ContentItem
func (ContentItem) TableName() string {
	return "text_contentitem"
}
