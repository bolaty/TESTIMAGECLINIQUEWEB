# Étape 1 : Build de l'application Angular
FROM node:18 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Étape 2 : Serveur Nginx pour servir l'application
FROM nginx:alpine
COPY --from=build /app/dist/hopital-fppn-client /usr/share/nginx/html
RUN apk add --no-cache gettext
CMD envsubst '${API_URL}' < /usr/share/nginx/html/assets/config/config.json > /usr/share/nginx/html/assets/config/config.json.tmp && \
    mv /usr/share/nginx/html/assets/config/config.json.tmp /usr/share/nginx/html/assets/config/config.json && \
    nginx -g 'daemon off;'