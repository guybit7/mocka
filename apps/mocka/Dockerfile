# Step 1: Use Node.js image to build the application
FROM node:20.15.0 AS build

# Set the working directory
WORKDIR /app

# Copy the root package.json and package-lock.json to install dependencies
COPY ../../package.json ../../package-lock.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Step 2: Build the application
RUN npx nx reset
RUN npx nx clear-cache
RUN npx nx run mocka:build --configuration=production --verbose

# Step 3: Prepare the final image
FROM node:20.15.0 AS production

# Set the working directory for the production stage
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/dist/apps/mocka ./dist/apps/mocka

# Install only production dependencies
COPY ../../package.json ../../package-lock.json ./
RUN npm install --only=production
RUN npm install -g nx

# Expose the port the app runs on
EXPOSE 3000

# Set the command to start the application
# CMD ["npx", "nx", "run", "mocka:serve", "--configuration=production"]
CMD ["node", "dist/apps/mocka/main.js"]
