# Use Node.js base image with a specific LTS version
FROM node:14 AS build

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install NestJS dependencies
RUN npm install --only=production

# Copy the rest of the application code to the working directory
COPY . .

# Build your NestJS application
RUN npm run build

# Use a smaller base image for production
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy built files and necessary dependencies from the build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Expose port 3000 (or the port your NestJS application runs on)
EXPOSE 3000

# Command to run your NestJS application
CMD ["node", "dist/main.js"]
