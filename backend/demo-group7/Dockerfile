# Step 1: Use the official OpenJDK image as the base image
FROM openjdk:20-jdk-slim

WORKDIR /app

COPY mvnw ./
COPY .mvn .mvn

COPY pom.xml .
COPY src ./src

RUN ./mvnw dependency:resolve

# Step 2: Expose the port using environment variable
EXPOSE $SPRING_PORT

CMD ["./mvnw", "spring-boot:run"]