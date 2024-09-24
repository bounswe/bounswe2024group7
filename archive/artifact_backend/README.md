# Django
# Artifact Backend

This template provides a minimal setup to start backend side with Django framework.
The backend part of our application implements the REST API functionalities with Django libraries and connects the data to MySQL with MySQLClient. It is designed to be fast, reliable and scalable.

## Technologies Used

- **Django**: Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel. It’s free and open source.
- **@PyMySQL/mysqlclient**: This project is a fork of MySQLdb. This project adds Python 3 support and fixed many bugs. MySQLdb is an interface to the popular MySQL database server that provides the Python database API.
- **Django REST Framework**: Django REST framework is a powerful and flexible toolkit for building Web APIs.
- **Django CORS Headers**: A Django App that adds Cross-Origin Resource Sharing (CORS) headers to responses. This allows in-browser requests to your Django application from other origins.
- **SPARQL Wrapper**: SPARQLWrapper is a simple Python wrapper around a SPARQL service to remotelly execute your queries. It helps in creating the query invokation and, possibly, convert the result into a more manageable format.
- **python-dotenv**: Python-dotenv reads key-value pairs from a .env file and can set them as environment variables.

## Getting Started

These instructions will get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
- Python3 (latest release is recommended)
- pip (comes with Python3)
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
```

### Installing and Running Locally

1. **Clone the repository:**
    ```bash
    git clone https://github.com/bounswe/bounswe2024group7
    cd artifact_backend
    ```

2. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3. **Migrate the model to create the database:**
    ```bash
    python manage.py migrate --noinput
    ```
   Access the application at `http://localhost:3000`.

4. **Start the application:**
    ```bash
    python manage.py runserver 0.0.0.0:8080
    ```
   Access the application at `http://0.0.0.0:8080`.

### Using Docker

Alternatively, you can use Docker to build and run the application without installing any libraries locally. The docker-compose file should be in the same directory as in project.

1. **Build the database container:**
    ```bash
    docker-compose build db
    ```

2. **Build the backend container:**
    ```bash
    docker-compose build backend
    ```
   The application should now be running on `http://0.0.0.0:8080`.

## Deployment

The deployment is managed via Google Cloud Run. We use a Docker container to build the image of our application. Do not forget to set the `ENVIRONMENT SECRETS` on the Cloud Run instance settings.

### Deploying to Google Cloud Run

1. **Set up Google Cloud SDK:**
   Ensure you have Google Cloud SDK installed and configured for your project.

2. **Build the image and push to Google Container Registry:**
    ```bash
    gcloud builds submit --tag gcr.io/your-project-id/backend
    ```

3. **Deploy the image to Cloud Run:**
    ```bash
    gcloud run deploy --image gcr.io/your-project-id/backend --platform managed
    ```
   Follow the prompts to enable necessary APIs, set the region, and configure the service.