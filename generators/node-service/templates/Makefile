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
	git flow init -d && \
	git config gitflow.prefix.versiontag "v" && \
	npm install --silent --no-progress

test:
	npm run lint && \
	npm run test

dev:
	npm run dev

build:
	npm run build

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
		make test

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
