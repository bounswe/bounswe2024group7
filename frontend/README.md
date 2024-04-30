# Artifact Frontend

This project is the frontend part of our application, developed using modern web technologies including React, Redux, and Vite. It is designed to be responsive, efficient, and scalable.

## Technologies Used

- **React**: A JavaScript library for building user interfaces. It's declarative and component-based, which makes it efficient and predictable in terms of data management and UI consistency.
- **Redux Toolkit**: Provides a simplified method of setting up stores, writing reducers, immutable update logic, and more. It integrates well with React applications for state management.
- **Vite**: Used as the build tool for its extremely fast hot module replacement (HMR). Vite significantly improves the development experience by providing quick rebuilds.
- **@tanstack/react-query**: Used for fetching, caching, and updating data in React applications without touching any "global state".
- **Chakra UI**: A simple, modular, and accessible component library that gives the developer the power to build a flexible and accessible design system.
- **Axios**: A promise-based HTTP client for the browser and node.js. It's lightweight, supports async-await, and provides a simple way to manage HTTP requests.

## Getting Started

These instructions will get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
- Node.js (v20 or higher recommended)
- npm (comes with Node.js)
- Docker (optional)

### Environment Variables

Before starting, you need to set up the necessary environment variables. Create a `.env` file at the root of your project and populate it with the following variables:

```plaintext
# Django settings
SECRET_KEY=your_secret_key
DEBUG=true_or_false
DJANGO_ALLOWED_HOSTS=comma_separated_list_of_hosts

# MySQL settings
MYSQL_ROOT_PASSWORD=your_mysql_root_password
MYSQL_DATABASE=your_database_name
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password

# Frontend Environment Variables
VITE_API_URL="http://localhost:8080"
ENV=DEVELOPMENT
```

### Using Docker Compose (RECOMMENDED)

The recommendetion of the developers is to use docker-compose to run the 
applications. This docker-compose command will build and run the backend, frontend, and MySQL database.

1. **Build the Docker images:**
    ```bash
    docker-compose build --no-cache
    ```

2. **Run the Docker containers and connect with network:**
    ```bash
    docker-compose up
    ```

### Installing and Running Locally

1. **Clone the repository:**
    ```bash
    git clone https://github.com/bounswe/bounswe2024group7
    cd frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the development server:**
    ```bash
    npm run dev
    ```
   Access the application at `http://localhost:3000`.

### Using Docker

Alternatively, you can use Docker to build and run the application without installing Node.js locally.

1. **Build the Docker image:**
    ```bash
    docker build -t frontend-app .
    ```

2. **Run the Docker container:**
    ```bash
    docker run -p 3000:3000 frontend-app
    ```
   The application should now be running on `http://localhost:3000`.

## Deployment

The deployment is managed via Google Cloud Run. We use a Docker container to build the image of our application. Do not forget to set the `ENVIRONMENT SECRETS` on the Cloud Run instance settings.

### Deploying to Google Cloud Run

1. **Set up Google Cloud SDK:**
   Ensure you have Google Cloud SDK installed and configured for your project.

2. **Build the image and push to Google Container Registry:**
    ```bash
    gcloud builds submit --tag gcr.io/your-project-id/frontend
    ```

3. **Deploy the image to Cloud Run:**
    ```bash
    gcloud run deploy --image gcr.io/your-project-id/frontend --platform managed
    ```
   Follow the prompts to enable necessary APIs, set the region, and configure the service.
