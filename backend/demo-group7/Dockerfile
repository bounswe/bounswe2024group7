# Step 1: Use the official OpenJDK image as the base image
FROM openjdk:20-jdk-slim

WORKDIR /app

COPY mvnw ./
COPY .mvn .mvn

COPY pom.xml .
COPY src ./src

RUN ./mvnw dependency:resolve

EXPOSE 8080

CMD ["./mvnw", "spring-boot:run"]