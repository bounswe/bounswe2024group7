# Step 1: Use the official OpenJDK image as the base image
FROM openjdk:20-jdk-slim

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy Maven Wrapper and make it executable
COPY mvnw ./
COPY .mvn .mvn
RUN chmod +x ./mvnw

# Step 4: Copy the pom.xml and resolve dependencies
COPY pom.xml .
RUN ./mvnw dependency:go-offline

# Step 5: Copy the source code and package the application
COPY src ./src
RUN ./mvnw package -DskipTests

# Step 6: Expose port 8080 for the backend service
EXPOSE 8080

# Step 7: Define environment variables for database configuration
ENV POSTGRES_HOST=postgres-db
ENV POSTGRES_DB=db
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

# Step 8: Run the Spring Boot application
CMD ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]
