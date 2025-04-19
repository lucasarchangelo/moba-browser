# Moba Game Monolith

Welcome to the Moba Game Monolith! This repository contains both the frontend and backend components of the Moba Game, a browser-based multiplayer online battle arena (MOBA) game. Players can create and customize their heroes, engage in battles, and compete against others in real-time.

## Project Structure

This monolith is organized into two main directories:

- **moba-app**: Contains the frontend application built with Next.js and Tailwind CSS. This is the user interface where players interact with the game.
- **moba-service**: Contains the backend service built with NestJS. This service provides the API and database functionality for the game.

## Technologies Used

### Frontend (moba-app)
- **Next.js**: A React framework for building server-rendered applications.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **TypeScript**: A superset of JavaScript that adds static types, enhancing code quality and maintainability.

### Backend (moba-service)
- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **MongoDB**: A NoSQL database for storing game data.
- **Docker**: For containerization and easy deployment.
- **Prometheus & Grafana**: For monitoring and metrics.

## Features

### Frontend
- User authentication and management
- Hero creation and customization
- Profile management with hero statistics
- Real-time updates for battles and events
- Responsive design for optimal user experience on various devices

### Backend
- User authentication and management
- Hero/character management with different classes
- Match history and statistics
- Inventory and item management
- Skills and abilities system
- Real-time match events
- Database migrations for schema evolution

## Getting Started

### Prerequisites

- Node.js (v18+) and npm (or yarn, pnpm)
- Docker and Docker Compose (for containerized development)

### Environment Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd moba-game-monolith
   ```

2. Copy the example environment files for both frontend and backend:
   ```bash
   cp moba-app/.env.example moba-app/.env
   cp moba-service/.env.example moba-service/.env
   ```

3. Adjust the environment variables in the `.env` files as needed.

### Running with Docker

The easiest way to run the application is using Docker:

```bash
# Start the entire application in development mode
make dev

# Start the application in production mode
make up

# Stop the application
make down

# Rebuild and restart the application
make rebuild
```

### Local Development

For local development without Docker, navigate to each directory and follow the respective instructions:

#### Frontend (moba-app)

```bash
cd moba-app
# Install dependencies
npm install

# Run in development mode
npm run dev
```

#### Backend (moba-service)

```bash
cd moba-service
# Install dependencies
npm install

# Run in development mode
npm run start:dev
```

## API Integration

The frontend application communicates with the backend service at `http://localhost:3000`. Ensure the backend service is running to interact with the API.

## Testing

### Frontend

```bash
cd moba-app
# Run unit tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Backend

```bash
cd moba-service
# Run unit tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## Deployment

The application is designed to be deployed using Docker:

1. Build the Docker images for both frontend and backend:
   ```bash
   cd moba-app
   docker build -t moba-app .
   cd ../moba-service
   docker build -t moba-service .
   ```

2. Run the containers:
   ```bash
   docker run -p 3000:3000 --env-file .env moba-service
   docker run -p 3001:3000 --env-file .env moba-app
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