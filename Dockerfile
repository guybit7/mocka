# Use a Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Install dependencies
RUN npm install

# Copy the entire Nx workspace
COPY . .

# Build the frontend and backend
RUN npm run build

# Expose necessary ports
EXPOSE 3000   # Backend
EXPOSE 4200   # Frontend

# Start backend and frontend (use a process manager if necessary)
CMD ["npm", "run", "start:prod"]
