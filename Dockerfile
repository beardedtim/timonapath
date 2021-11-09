FROM nginx

COPY ./config/nginx.conf /etc/nginx/nginx.conf
COPY ./config/mime.types /etc/nginx/conf/mime.types
COPY ./app/ /var/www/html/

EXPOSE 80