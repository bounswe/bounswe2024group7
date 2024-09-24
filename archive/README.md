## 🔎 About

We are the 7th group of CMPE352 for Spring'24. You can see our practice project description below.

## Team Members

- [Abdulsamet Alan](https://github.com/sametaln)
- [Ahmet Ayberk Durak](https://github.com/durakahmetayberk)
- [Asım Dağ](https://github.com/aasimdag)
- [Dağlar Eren Tekşen](https://github.com/Daglar1500)
- [Deniz Bilge Akkoç](https://github.com/DenizBilgeAkkoc)
- [Eren Pakelgil](https://github.com/bounswe/bounswe2024group7/wiki/Eren-Pakelgil)
- [Hanaa Zaqout](https://github.com/hanazaq)
- [Mert Cengiz](https://github.com/MertCengiz)
- [Mustafa Ocak](https://github.com/modjak)
- [Mustafa Oğuz Hekim](https://github.com/oguzhekim)

# Artifact: The Art Explorer

## Project Overview

Artifact is an innovative platform designed to enrich the interaction between art enthusiasts and the world of art. The platform serves as a comprehensive digital space where users can explore artworks, share personal experiences, and engage with a community of like-minded individuals.

## Key Features

### User Management
- **Registration and Login**: Users can register with a username, email, and a secure password. Registered users can log in, log out, and change their password as needed.
- **Personalization**: Registered users can use features like creating posts, commenting, liking, and saving posts to personal profiles.

### Content Interaction
- **Posts**: Users can create posts about their artwork or experiences with art they encounter, such as in museums. Each post can be enriched with titles, textual content, photos, and labels.
- **Wikidata Cards**: These are auto-generated informative posts that pull data from Wikidata based on user searches, offering detailed information about artworks.
- **Search and Filter**: Users can search for artworks or artists and filter results based on various criteria like labels or year intervals.

### Social Features
- **Following and Interaction**: Users can follow others, like posts, and save favorite posts. They can also block or report disturbing users, fostering a safe community environment.
- **Collections and Bookmarks**: Users can create collections of posts, making it easy to organize and revisit favorite content.

### Administration
- **Admin Panel**: Administrators have robust tools at their disposal to manage users, posts, and system settings, ensuring smooth operation and compliance with privacy standards.

## Getting Started

These instructions will get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
- Docker
- docker-compose

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

### Using Docker Compose

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
    
    The frontend application should now be running on `http://localhost:3000`.
    The backend application should now be running on `http://localhost:8080`.