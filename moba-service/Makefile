DOCKER_COMPOSE = docker-compose.yml
SERVICE_NAME = moba-service
DATABASE_NAME = postgres
GRAFANA_NAME = grafana_moba_service
LOKI_NAME = loki

dev:
	docker compose up --build $(SERVICE_NAME) --watch

services:
	docker compose -f $(DOCKER_COMPOSE) up -d --build $(DATABASE_NAME) $(LOKI_NAME) $(GRAFANA_NAME)

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