# Use the official Node.js image as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app/backend

# Copy the package.json and package-lock.json files into the container
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the port that the backend server will run on
EXPOSE 5000

# Command to start the backend server
CMD ["node", "server.js"]
