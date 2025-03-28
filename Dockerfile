# Étape 1 : Build de l'application Angular
FROM node:23.9.0-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Étape 2 : Serveur Nginx pour servir l'application
FROM nginx:alpine3.21
COPY --from=build /app/dist/hopital-fppn-client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN apk add --no-cache gettext
CMD ["sh", "-c", "envsubst '${API_URL}' < /usr/share/nginx/html/assets/config/config.json > /usr/share/nginx/html/assets/config/config.json.tmp && mv /usr/share/nginx/html/assets/config/config.json.tmp /usr/share/nginx/html/assets/config/config.json && nginx -g 'daemon off;'"]