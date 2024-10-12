# Using node:20 for the mobile application.
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Expose the port React Native server runs on 8081
EXPOSE 8081

# Start the project using "npm start"
CMD ["npm", "start"]