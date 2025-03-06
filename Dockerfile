FROM nginx:alpine
COPY dist /usr/share/nginx/html
RUN apk add --no-cache gettext
CMD envsubst '${API_URL}' < /usr/share/nginx/html/assets/config/config.json > /usr/share/nginx/html/assets/config/config.json.tmp && \
    mv /usr/share/nginx/html/assets/config/config.json.tmp /usr/share/nginx/html/assets/config/config.json && \
    nginx -g 'daemon off;'