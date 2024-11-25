.PHONY: build up deps

deps:
	pdm sync
	npm install
	npm run build

build:
	docker-compose build

up:
	docker-compose up -d

up-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

pull:
	docker-compose pull
	