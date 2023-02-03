FROM node:alpine
WORKDIR /app/backend
COPY package.json .
RUN npm i --prod
RUN npm i pm2 -g
COPY pm2.json .
COPY . .
EXPOSE 4000
CMD ["pm2-runtime","pm2.json"]