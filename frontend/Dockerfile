# Using node:20 for the vite to work correct.
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app. But remove the node_modules folder
COPY . .

# Remove the node_modules folder
RUN rm -rf node_modules

# Install any needed packages specified in package.json
RUN npm install

# Make port 3000 available for the vite app
EXPOSE 3000

# Define environment variable
#ENV NODE_ENV=development
ENV REACT_APP_API_BASE_URL=http://localhost:30002
ENV VITE_API_URL=http://165.227.166.132:30002

# Run the app when the container launches
CMD ["npm", "run", "dev"]
