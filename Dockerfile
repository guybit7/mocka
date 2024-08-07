FROM node:lts-alpine as build
WORKDIR /app
COPY ./package*.json ./
RUN echo "Contenr of app:"
RUN ls -al
RUN npm install
COPY . .
RUN npx nx run mocka-ui:build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/apps/mocka-ui /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
