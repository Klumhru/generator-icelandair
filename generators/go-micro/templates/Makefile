ifndef PROJECT_NAME
	PROJECT_NAME := <%= projectName %>
endif

ifndef DOCKER_USER
	DOCKER_USER := icelandairlabs
endif

ifndef DOCKER_REGISTRY_HOST
	DOCKER_REGISTRY_HOST := docker.icelandairlabs.com
endif

ifndef PIPELINE_VERSION
	PIPELINE_VERSION := latest
endif

ifndef DOCKER_IMAGE
	DOCKER_IMAGE := ${DOCKER_REGISTRY_HOST}/${DOCKER_USER}/${PROJECT_NAME}:${PIPELINE_VERSION}
endif

ifndef DOCKER_BUILDER_IMAGE
	DOCKER_BUILDER_IMAGE := ${DOCKER_REGISTRY_HOST}/${DOCKER_USER}/${PROJECT_NAME}-builder:${PIPELINE_VERSION}
endif


# Development
provision:
	# git flow init -d && \
	# git config gitflow.prefix.versiontag "v" && \
	go get -t -u ./...

dev:
	@go get github.com/smartystreets/goconvey
	@goconvey -port 8081 -watchedSuffixes .go,.json

test:
	@go get github.com/jstemmer/go-junit-report
	@go test -v ./... | go-junit-report > report.xml

cov:
	@go test ./handlers -coverprofile=cover.out
	@go tool cover -html=cover.out -o coverage.html

bench:
	@go  test ./... -bench=".*"

build:
	go get ./...
	CGO_ENABLED=0 go build -o tmp/<%= gitRepo %>

# Container
docker:
	docker build -t ${DOCKER_IMAGE} .

docker-push:
	docker push ${DOCKER_IMAGE}

docker-build:
	docker run -v ${HOME}/.ssh:/root/.ssh \
		-v ${PWD}/app:/usr/src/app \
		-w /usr/src/app \
		${DOCKER_BUILDER_IMAGE}
		make build

docker-test:
	docker run -v ${HOME}/.ssh:/root/.ssh \
		-v ${PWD}/app:/usr/src/app \
		-w /usr/src/app \
		${DOCKER_BUILDER_IMAGE}
		make docker-test-internal

docker-test-internal:
	# Don't use this on developer machines, it's for internal docker build
	# It will fuck up your git configuration
	git config --global url."git@github.com:".insteadOf "https://github.com/"
	go get -t ./...
	go get github.com/jstemmer/go-junit-report
	go test -v ./... | go-junit-report > report.xml
	go test ./handlers -coverprofile=cover.out
	go tool cover -html=cover.out -o coverage.html

# Builder container
docker-builder:
	docker build -t ${DOCKER_BUILDER_IMAGE} -f Dockerfile.builder .

docker-builder-push:
	docker push ${DOCKER_BUILDER_IMAGE}

docker-builder-shell:
	docker run -it --rm ${DOCKER_BUILDER_IMAGE} bash

# Kubernetes
rebuild-controller: clean-controller controller
rebuild-service: clean-service service

clean-controller:
	@kubectl delete -f ${PROJECT_NAME}.rc.yml

controller:
	@kubectl create -f ${PROJECT_NAME}.rc.yml

clean-service:
	@kubectl delete -f ${PROJECT_NAME}.service.yml

service:
	@kubectl create -f ${PROJECT_NAME}.service.yml
