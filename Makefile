ifndef PROJECT_NAME
	PROJECT_NAME := generator-icelandair
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

ifndef _NPMRC
	_NPMRC := ~/.npmrc
endif

docker:
	docker build -t ${DOCKER_IMAGE} .

docker-push:
	docker push ${DOCKER_IMAGE}

docker-pull:
	docker pull ${DOCKER_IMAGE}

docker-shell:
	docker run -it --rm ${DOCKER_IMAGE} bash

docker-test:
	docker run --rm \
		-w /usr/src \
		${DOCKER_IMAGE} \
		npm run --silent test
	sudo chown -R ${USER}:${USER} .

docker-build:
	docker run --rm \
		-v ${PWD}/generators:/usr/src/generators \
		-w /usr/src \
		${DOCKER_IMAGE} \
		npm run --silent build
	sudo chown -R ${USER}:${USER} .

docker-publish:
	docker run --rm \
		-v ${_NPMRC}:/usr/src/.npmrc \
		-v ${PWD}/generators:/usr/src/generators \
		-w /usr/src \
		${DOCKER_IMAGE} \
		./bin/publish
	sudo chown -R ${USER}:${USER} .
