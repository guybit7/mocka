# mocka/apps/ui-tanstack/Dockerfile
# Step 1: Use Node image to build the app
FROM node:20.15.0 AS build
WORKDIR /app

# Copy package.json and package-lock.json from root context
COPY ../../package.json ../../package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the ui-tanstack app
COPY . .

# Build the app
RUN npx nx run mocka-ui:build

# Step 2: Use Nginx to serve the app
FROM nginx:latest
COPY --from=build /app/dist/apps/mocka-ui /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
