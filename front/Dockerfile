# Step 1: Build the application
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you're using yarn)
COPY package*.json ./

# Install the dependencies (including dev dependencies for build)
RUN npm install

# Copy the rest of the application files
COPY . .
EXPOSE 5173

# Build the Vite project
CMD [ "npm", "run", "dev" ]
