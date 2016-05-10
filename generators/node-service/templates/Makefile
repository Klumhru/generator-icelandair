ifndef PROJECT_NAME
	PROJECT_NAME := <%= projectName %>
endif

ifndef DOCKER_USER
	DOCKER_USER := icelandairlabs
endif

ifndef DOCKER_REGISTRY_HOST
	DOCKER_REGISTRY_HOST := docker.icelandairlabs.com
endif

ifndef IMAGE_TAG
	IMAGE_TAG := latest
endif

ifndef BUILDER_IMAGE_TAG
	BUILDER_IMAGE_TAG := ${IMAGE_TAG}
endif

ifndef DOCKER_IMAGE
	DOCKER_IMAGE := ${DOCKER_REGISTRY_HOST}/${DOCKER_USER}/${PROJECT_NAME}:${IMAGE_TAG}
endif

ifndef DOCKER_BUILDER_IMAGE
	DOCKER_BUILDER_IMAGE := ${DOCKER_REGISTRY_HOST}/${DOCKER_USER}/${PROJECT_NAME}-builder:${BUILDER_IMAGE_TAG}
endif

# Development
provision:
	git flow init -d && \
	git config gitflow.prefix.versiontag "v" && \
	npm install --loglevel=error --no-progress

dev:
	npm run dev

test:
	npm run lint && \
	npm run test

build:
	npm run build

# Container
docker:
	docker build -t ${DOCKER_IMAGE} .

docker-push:
	docker push ${DOCKER_IMAGE}

docker-build:
	docker run -v ${HOME}/.ssh:/root/.ssh \
		-v ${PWD}:/usr/src/app \
		-w /usr/src/app \
		${DOCKER_BUILDER_IMAGE}
		make build

docker-test:
	docker run -v ${HOME}/.ssh:/root/.ssh \
		-v ${PWD}:/usr/src/app \
		-w /usr/src/app \
		${DOCKER_BUILDER_IMAGE}
		make test

# Builder container
docker-builder:
	docker build -t ${DOCKER_BUILDER_IMAGE} -f Dockerfile.builder .

docker-builder-push:
	docker push ${DOCKER_BUILDER_IMAGE}

docker-builder-pull:
	docker push ${DOCKER_BUILDER_IMAGE}

docker-builder-shell:
	docker run -it --rm ${DOCKER_BUILDER_IMAGE} bash

# Kubernetes
rebuild-deployment: deployment-clean deployment
rebuild-service: service-clean service

deployment:
	@cat ${PROJECT_NAME}.deployment.yml | \
	TPL_DOCKER_IMAGE=${DOCKER_IMAGE} \
	util/env_replace.py TPL_DOCKER_IMAGE | \
	kubectl apply -f -

deployment-clean:
	@cat ${PROJECT_NAME}.deployment.yml | \
	TPL_DOCKER_IMAGE="" \
	util/env_replace.py TPL_DOCKER_IMAGE | \
	kubectl delete -f -

service:
	kubectl apply -f ${PROJECT_NAME}.service.yml

service-clean:
	kubectl delete -f ${PROJECT_NAME}.service.yml
