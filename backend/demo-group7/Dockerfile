# 1. Aşama: Maven ile uygulamayı derleme
FROM maven:3.8.4 AS builder

# Çalışma dizinini ayarla
WORKDIR /app

# Maven projesi dosyasını kopyala
COPY pom.xml .

# Bağımlılıkları indir
RUN mvn -B dependency:go-offline

# Tüm proje kaynaklarını kopyala
COPY src ./src

# Uygulamayı JAR olarak paketle (Testleri atla çünkü DB gerektiriyor)
RUN mvn -B package -DskipTests

# 2. Aşama: Daha hafif bir OpenJDK ile çalışma ortamı
FROM openjdk:20-jdk-slim

# Çalışma dizinini ayarla
WORKDIR /app

# Önceki aşamadan JAR dosyasını kopyala
COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar ./backend-app.jar

# Uygulamanın çalışacağı portu aç
EXPOSE 8080

# Container başlatıldığında uygulamayı çalıştır
CMD ["java", "-jar", "backend-app.jar"]
