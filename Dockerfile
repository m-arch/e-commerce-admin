# Dockerfile

FROM node:12.16.0
WORKDIR /var/www/apps
COPY e-commerce-admin-app/ .
RUN npm install
RUN yarn build
EXPOSE 3030
WORKDIR /var/www/apps/server
RUN cp launch.sh /usr/local/bin/ && \
    chmod +x /usr/local/bin/launch.sh
ENTRYPOINT ["/usr/local/bin/launch.sh"]

