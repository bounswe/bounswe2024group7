# Using node:20 for the vite to work correct.
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Make port 3000 available for the vite app
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=development

# Run the app when the container launches
CMD ["npm", "run", "dev"]
