# Use official Node.js LTS image
FROM node:18-alpine


# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci


# Copy the rest of the app
COPY . .

# Build TypeScript
RUN npm run build

USER node

# Expose the app port
EXPOSE 5002

# Start the app (adjust if your start script is different)
CMD ["npm", "start"]