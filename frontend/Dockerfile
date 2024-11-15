# Using node:20 for the Vite to work correctly.
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Remove the node_modules folder (ensure clean install)
RUN rm -rf node_modules

# Install packages specified in package.json
RUN npm install

# Expose port 3000 for the Vite app
EXPOSE 3000

# Define environment variable for backend API URL
ENV REACT_APP_API_BASE_URL=http://localhost:30002

# Run the app when the container launches
CMD ["npm", "run", "dev"]
