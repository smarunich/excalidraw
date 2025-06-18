# Excalidraw Docker Tasks

This document describes how to use the Taskfile.yml for running Excalidraw locally with Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed and running
- [Task](https://taskfile.dev/installation/) task runner installed
- Git (for cloning the repository)

## Quick Start

### Development Mode
```bash
# Start development server with hot reload
task dev

# Or use the quick start (stops existing containers first)
task quick:dev
```

### Production Mode
```bash
# Build and run production container
task prod

# Or use the quick start
task quick:prod
```

## Available Tasks

### Core Tasks

| Task | Description | Port |
|------|-------------|------|
| `task dev` | Start development mode with hot reload | 3000 |
| `task prod` | Build and run production mode | 8080 |
| `task quick:dev` | Quick dev start (stops existing first) | 3000 |
| `task quick:prod` | Quick prod start (stops existing first) | 8080 |

### Development Tasks

| Task | Description |
|------|-------------|
| `task dev:build` | Build development Docker image |
| `task dev:up` | Start development container |
| `task dev:compose` | Use docker-compose for development |
| `task dev:compose:down` | Stop docker-compose |

### Production Tasks

| Task | Description |
|------|-------------|
| `task prod:build` | Build production Docker image |
| `task prod:run` | Run production container |
| `task prod:stop` | Stop production container |

### Local Development (No Docker)

| Task | Description |
|------|-------------|
| `task local:dev` | Start local development server |
| `task local:build` | Build locally for production |
| `task local:test` | Run tests locally |

### Container Management

| Task | Description |
|------|-------------|
| `task stop` | Stop all running containers |
| `task clean` | Clean up containers and images |
| `task clean:all` | Clean up everything including volumes |
| `task status` | Show status of containers |
| `task logs` | Show logs from running container |
| `task shell` | Open shell in development container |
| `task health` | Check health of running container |

### Development Tools

| Task | Description |
|------|-------------|
| `task lint` | Run linting in container |
| `task test` | Run tests in container |
| `task build:multiplatform` | Build multi-platform image |

## Usage Examples

### Development Workflow
```bash
# Start development server
task dev

# Check status
task status

# View logs
task logs

# Run tests
task test

# Stop when done
task stop
```

### Production Deployment
```bash
# Build and run production
task prod

# Check health
task health

# View logs
task logs

# Stop production
task prod:stop
```

### Cleaning Up
```bash
# Stop all containers
task stop

# Clean up containers and images
task clean

# Full cleanup including volumes
task clean:all
```

## Accessing the Application

- **Development**: http://localhost:3000
- **Production**: http://localhost:8080

## Docker Compose Alternative

You can also use the existing docker-compose setup:

```bash
# Start with docker-compose
task dev:compose

# Stop docker-compose
task dev:compose:down
```

## Troubleshooting

### Container Won't Start
```bash
# Check status
task status

# View logs
task logs

# Clean and retry
task clean
task dev
```

### Port Already in Use
```bash
# Stop existing containers
task stop

# Or modify ports in Taskfile.yml
```

### Build Issues
```bash
# Clean everything and rebuild
task clean:all
task dev:build
```

## Configuration

The Taskfile.yml uses these default settings:

- **Project Name**: excalidraw
- **Development Port**: 3000
- **Production Port**: 8080
- **Docker Image**: excalidraw

You can modify these in the `vars` section of Taskfile.yml.

## Notes

- Development mode includes hot reload with volume mounts
- Production mode serves a static build via nginx
- The development container shares your local code changes
- Production container is self-contained and optimized