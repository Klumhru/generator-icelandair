package models

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"strings"
)

// ContractRequest describes a request block in a contract
type ContractRequest struct {
	Headers map[string]string `json:"headers"`
}

// ContractResponse describes a response block in a contract
type ContractResponse struct {
	Status  int                    `json:"status"`
	Headers map[string]string      `json:"headers"`
	Content map[string]interface{} `json:"content"`
}

// Contract describes test data for a CDC
type Contract struct {
	Request  ContractRequest  `json:"request"`
	Response ContractResponse `json:"response"`
}

// ReadContract reads a contract data file and returns data for test runners
func ReadContract(contractFile string) (path, method string, request ContractRequest, response ContractResponse) {
	content, err := ioutil.ReadFile(contractFile)

	var contractData map[string]interface{}
	if err != nil {
		panic(err)
	}
	if err := json.Unmarshal(content, &contractData); err != nil {
		panic(err)
	}

	var data interface{}
	for path, data = range contractData {
		for method, data = range data.(map[string]interface{}) {
			method = strings.ToUpper(method)
			requestJSON, err := json.Marshal(data.(map[string]interface{})["request"])
			if err != nil {
				panic(err)
			}
			if err := json.Unmarshal(requestJSON, &request); err != nil {
				log.Fatalf("Failed to unmarshal json `%s` into request: %v\n", requestJSON, err)
			}
			responseJSON, err := json.Marshal(data.(map[string]interface{})["response"])
			if err != nil {
				panic(err)
			}
			if err := json.Unmarshal(responseJSON, &response); err != nil {
				log.Fatalf("Failed to unmarshal json `%s` into response: %v\n", responseJSON, err)
			}
			break
		}
		break
	}
	return path, method, request, response
}
