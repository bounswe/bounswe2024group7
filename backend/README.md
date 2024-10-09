
# Spring Boot + PostgreSQL Dockerized App

This project contains a Spring Boot app and a PostgreSQL database, both running inside Docker containers.

## Prerequisites
- Docker: https://www.docker.com/get-started
- Docker Compose: https://docs.docker.com/compose/install/

## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/bounswe/bounswe2024group7
cd <your-repository-directory>
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and add:

```
POSTGRES_DB=group7test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=postgres-db
POSTGRES_PORT=5432
```

Alternatively, export these variables in your shell.
Als you can give those values whatever you want, the values are just example.

### 3. Build and Run the Containers
```bash
docker-compose up --build
```

The application will be available at:
```
http://localhost:8080
```

### 4. Stop Containers
```bash
docker-compose down
```

## Project Structure
- **Dockerfile**: Builds the Spring Boot app image.
- **docker-compose.yml**: Orchestrates PostgreSQL and Spring Boot services.

## Database Configuration
- **POSTGRES_DB**: Name of the database.
- **POSTGRES_USER**: Database user.
- **POSTGRES_PASSWORD**: User password.
- **POSTGRES_HOST**: Database host (use `postgres-db` to match service name).
- **POSTGRES_PORT**: Database port (`5432`).
