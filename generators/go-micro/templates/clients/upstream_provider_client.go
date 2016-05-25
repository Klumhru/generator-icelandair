package clients

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

// UpstreamProviderClient calls upstream provider
type UpstreamProviderClient struct {
	upstreamProviderURL string
}

// NewUpstreamProviderClient creates a new client for the given url
func NewUpstreamProviderClient(url string) *UpstreamProviderClient {
	l := UpstreamProviderClient{}
	l.upstreamProviderURL = url
	return &l
}

// GetItem calls the upstream provider and returns the content from it
func (c *UpstreamProviderClient) GetItem() string {
	req, _ := http.NewRequest("GET", c.upstreamProviderURL+"/item/", nil)

	req.Header.Add("Accept", "application/json; charset=utf-8; sub-type=web")
	req.Header.Add("X-Correlation-Id", "some correlation id")

	res, err := http.DefaultClient.Do(req)

	if err != nil {
		return fmt.Sprintf("Error performing request: %v", err)
	}

	if res.StatusCode == http.StatusOK {
		body, errr := ioutil.ReadAll(res.Body)
		if errr != nil {
			panic(errr)
		}

		var obj interface{}
		err = json.Unmarshal(body, &obj)
		if err != nil {
			return fmt.Sprintf("Error decoding body: %v\n", err)
		}

		if m, ok := obj.(map[string]interface{}); ok {
			return fmt.Sprintf("%v", m["text"])
		}
	}

	return "Error getting item"
}
