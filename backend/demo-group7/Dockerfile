# Step 1: Use the official OpenJDK image as the base image
FROM openjdk:23-jdk-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the project’s jar file into the container
COPY out/artifacts/demo_jar/demo.jar app.jar

# Step 4: Expose the application port (default is 8080 for Spring Boot)
EXPOSE 8080

# Step 5: Define the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

