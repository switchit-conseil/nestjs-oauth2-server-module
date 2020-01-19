#!make
.PHONY: help deploy clean

.DEFAULT_GOAL := help

# PROJECT_NAME
NODE_ENV?=development
PROJECT_NAME?=switchit-oauth2

# INITIALIZATIONS
DOCKER_COMPOSE_FILE?=./docker-stack.yml
DOCKER_COMPOSE=docker stack deploy ${PROJECT_NAME} --compose-file=${DOCKER_COMPOSE_FILE}

help:
	@clear
	@printf "\033[36m%-30s\033[0m %s\n" help Help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | cut -d: -f2- | sort -t: -k 2,2 | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Project containers
deploy: ## (Docker) Deploy the required stack
	@docker stack deploy ${PROJECT_NAME} --compose-file=${DOCKER_COMPOSE_FILE}

clean: ## (Docker) Stops and removes the current stack
	@docker stack rm ${PROJECT_NAME}

