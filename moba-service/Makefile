DOCKER_COMPOSE = docker-compose.yml
SERVICE_NAME = moba-service
DATABASE_NAME = postgres
MONITORING_NAME = prometheus_moba_service
GRAFANA_NAME = grafana_moba_service
NODE_EXPORTER_NAME = node-exporter_moba_service

dev:
	docker compose up --build $(SERVICE_NAME)

services:
	docker compose -f $(DOCKER_COMPOSE) up -d --build $(DATABASE_NAME)

rebuild:
	docker compose -f $(DOCKER_COMPOSE) down --volumes --remove-orphans
	docker compose -f $(DOCKER_COMPOSE) up --build

up:
	docker compose -f $(DOCKER_COMPOSE) up -d --build

down:
	docker compose -f $(DOCKER_COMPOSE) down $(service)

logs:
	docker compose logs -f $(service)

bash:
	docker exec -it $(service) sh