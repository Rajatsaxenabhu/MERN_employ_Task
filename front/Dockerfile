    FROM node:18 as build
    WORKDIR /app
    COPY package.json package-lock.json ./
    RUN npm install
    COPY . .
    RUN npm run build

    FROM nginx:alpine
    RUN rm -rf /usr/share/nginx/html/*
    COPY --from=build /app/dist /usr/share/nginx/html
    RUN rm /etc/nginx/conf.d/default.conf
    COPY nginx.conf /etc/nginx/conf.d

    EXPOSE 80

    CMD ["nginx", "-g", "daemon off;"]
