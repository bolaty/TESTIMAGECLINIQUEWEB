FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
RUN apk add --no-cache gettext

CMD ["/bin/sh", "-c", "envsubst '$$API_URL' < /usr/share/nginx/html/assets/config.js > /usr/share/nginx/html/assets/config.js && exec nginx -g 'daemon off;'"]
