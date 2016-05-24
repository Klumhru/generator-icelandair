# <%= projectName %>

## What is this project supposed to do
> <%= projectDescription %>

## How to consume
See [USAGE.md](usage instructions)

## How to contribute
See [CONTRIBUTING.md](contribution instructions)

## Swagger -- help, remove before check in
create server with swagger:
	@go get -u github.com/go-swagger/go-swagger/cmd/swagger
	@swagger generate server -A ${COMPONENT} -f /contracts/downstream/SomeConsumer/contract.yml

create client with swagger:
	@go get -u github.com/go-swagger/go-swagger/cmd/swagger
	@swagger generate client -A Producer -f ./contracts/upstream/SomeProducer/contract.yml

