# stage 1: build

FROM node:14.17.4-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm build

# stage 2: run

FROM nginx:1.17.1-alpine As prod-stage

COPY --from=build /app/dist/assignment /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]