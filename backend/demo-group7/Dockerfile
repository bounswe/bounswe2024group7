# Step 1: Use the official OpenJDK image as the base image
FROM openjdk:20-jdk-slim

# Set the working directory
WORKDIR /app

# Copy Maven Wrapper
COPY mvnw ./
COPY .mvn .mvn

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Resolve dependencies
RUN ./mvnw dependency:resolve

# Expose port 8080 for the backend service
EXPOSE 8080

# Define environment variables for database configuration
ENV POSTGRES_HOST=postgres-db
ENV POSTGRES_DB=db
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

# Run the Spring Boot application
CMD ["./mvnw", "spring-boot:run"]
