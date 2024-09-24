# Using node:20 for the vite to work correct.
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Expose the port Expo server runs on (8081 in Artifact)
EXPOSE 8081

# Start the project using "npm start"
CMD ["npm", "start"]