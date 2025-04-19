# Moba Service

Backend service for the Moba Game browser game. This service provides the API and database functionality for the Moba Game platform.

## Overview

Moba Game is a browser-based game that simulates fights with players from around the world. Players can choose their character class, evolve their abilities, and compete to reach the top of the rankings.

This service is built with:
- NestJS - A progressive Node.js framework for building efficient and scalable server-side applications
- MongoDB - A NoSQL database for storing game data
- Docker - For containerization and easy deployment
- Prometheus & Grafana - For monitoring and metrics

## Features

- User authentication and management
- Hero/character management with different classes
- Match history and statistics
- Inventory and item management
- Skills and abilities system
- Real-time match events
- Database migrations for schema evolution

## Architecture

The service follows a modular architecture:

- **Database Module**: Handles MongoDB connection and schema definitions
- **Migrations Module**: Manages database schema migrations
- **API Modules**: Various modules for different game aspects (users, heroes, matches, etc.)

## Prerequisites

- Docker and Docker Compose
- Node.js (v18+) and pnpm (for local development)
- MongoDB (provided via Docker)

## Getting Started

### Environment Setup

1. Clone the repository
2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
3. Adjust the environment variables in `.env` as needed

### Running with Docker

The easiest way to run the service is using Docker:

```bash
# Start the service in development mode
make dev

# Start the service in production mode
make up

# Stop the service
make down

# Rebuild and restart the service
make rebuild
```

### Local Development

For local development without Docker:

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm run start:dev

# Run tests
pnpm test

# Build for production
pnpm run build
```

## API Documentation

The API documentation is available at `/api` when the service is running.

## Database Migrations

The service includes a migration system to manage database schema changes:

- Migrations are automatically run on service startup
- Each migration has `up` and `down` methods for applying and rolling back changes
- Migration history is tracked in the database

## Monitoring

The service includes monitoring with Prometheus and Grafana:

- Metrics are available at `/metrics`
- Grafana dashboard is available at the configured port (default: 3002)

## Testing

```bash
# Run unit tests
pnpm test

# Run tests with coverage
pnpm test:cov

# Run tests in watch mode
pnpm test:watch
```

## Deployment

The service is designed to be deployed using Docker:

1. Build the Docker image:
   ```bash
   docker build -t moba-service .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env moba-service
   ```

For production deployments, consider using Docker Compose or Kubernetes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
