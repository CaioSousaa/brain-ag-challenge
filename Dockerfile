FROM node:lts

WORKDIR /home/api

COPY package*.json .
COPY yarn.lock .

RUN npm install 

COPY . . 

RUN npx prisma generate 

EXPOSE 3333

CMD npm run dev