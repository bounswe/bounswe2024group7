# Use node to build
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy the files
COPY . .

# Install dependencies and build the production app
RUN npm install
RUN npm run build

# Use a lightweight web server
FROM nginx:alpine

# Copy the build output to NGINX's HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the NGINX server
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]