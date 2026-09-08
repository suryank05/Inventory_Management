FROM node:20-alpine

WORKDIR /Frontend

COPY Inventory_Frontend/inventory/package*.json ./

RUN npm install

COPY Inventory_Frontend/inventory .

EXPOSE 5173

RUN npm run build

# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM maven:3.9.2-eclipse-temurin-17 AS builder

WORKDIR /backend

# Copy everything at once
COPY /InventoryManagement/InventoryManagement .

# Simple build - no dependency caching
RUN mvn clean package -DskipTests

# Stage 2: Run  
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the jar using wildcard (safer)
COPY --from=backend-builder /backend/target/*.jar app.jar

# Copy frontend build to Spring Boot static folder
COPY --from=frontend-builder /frontend/dist /app/static
EXPOSE 8083

ENTRYPOINT ["java", "-jar", "app.jar"]