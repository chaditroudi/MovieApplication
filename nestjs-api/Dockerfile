# Stage 1: Build the application
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install all dependencies, including dev dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create a lightweight image for running the application
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install production dependencies
RUN npm install --only=production

# Copy the build artifacts and node_modules from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.env ./.env

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/src/main"]
