FROM node:22-alpine
WORKDIR /opt/app
RUN apk add --no-cache libc6-compat
COPY bootstrap.sh /usr/local/bin/bootstrap.sh
RUN chmod +x /usr/local/bin/bootstrap.sh
EXPOSE 1337
CMD ["/usr/local/bin/bootstrap.sh"]
