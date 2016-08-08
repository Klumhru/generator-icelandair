# <%= projectName %>

## How to use this code
The code comes with both consumer and provider and should compile and test out of the box.
Check code into github before changing anything to validate generated code is valid and having a green build.

Change the contract for consumer, provider or both. Delete files that are not used.
Create json test for consumer/ provider

## Swagger
Can be used to create a client or server code.

create server with swagger:
	go get -u github.com/go-swagger/go-swagger/cmd/swagger
	swagger generate server -A ${COMPONENT} -f /contracts/downstream/SomeConsumer/contract.yml

create client with swagger:
	go get -u github.com/go-swagger/go-swagger/cmd/swagger
	swagger generate client -A Producer -f ./contracts/upstream/SomeProducer/contract.yml

