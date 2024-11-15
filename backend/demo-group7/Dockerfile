FROM maven:3.9.5-eclipse-temurin-20 AS builder

WORKDIR /app

COPY pom.xml .

RUN mvn -B dependency:go-offline

COPY src ./src

RUN mvn -B package -DskipTests

FROM openjdk:20-jdk-slim

WORKDIR /app

COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar ./backend-app.jar

EXPOSE 8080

CMD ["java", "-jar", "backend-app.jar"]
