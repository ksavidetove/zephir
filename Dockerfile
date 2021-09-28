FROM nginx:1.21.3-alpine

RUN apk add --no-cache bash
COPY ./scripts/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

CMD ["/wait-for-it.sh", "users-microservice:5050", "--", "nginx", "-g", "daemon off;"]