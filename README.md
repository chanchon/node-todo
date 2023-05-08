
# Deploy Todo App built with Angular and MongoDB

## ลิงค์ Url ทีได้จากการ Deploy : http://13.210.159.209:3000/

## Installation and Edit code

1. โคลนไฟล์จาก: https://github.com/scotch-io/node-todo
2. ติดตั้งแอพพลิเคชั่น: `npm install`
3. ลมไฟล์ : `config/database.js`
4. นำไฟล์ : mongodb ของเราไปใส่ในไฟล์ : `server.js`
5. มีการแก้ไขคำสั่ง database ใหม่ดังนี้ 
```js
mongoose.Promise = global.Promise;
const promise = mongoose.connect('mongodb://mongo:27017/node-todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
promise.then(function(db) {
    console.log("Connected to database!!!");
}, function(err){
    console.log("Error in connecting database " + err);
});
```


6. รันเซิฟร์เวอร์ด้วยคำสั่ง : `node-server.js`
7. ดูในบราวเซอร์ที่ : `http://localhost:3000` เพื่อทดสอบภายในเครื่องของเรา
9. อัปขึ้น Github ของเราเพื่อที่จะดึงมาใช้ใน Docker และ aws


## How to Deploy using Docker with AWS

1. ไปที่ https://aws.amazon.com/ และ ใช้ EC2  instances เพื่อเชื่อมต่อบน AWS
2. เปิด `Command Promp` และทำการเชื่อมต่อไปยัง AWS โดยใช้ ubuntu และติดตั้ง `Docker` 
3. โคลนไฟล์ที่แก้ไขแล้วจาก: https://github.com/chanchon/node-todo
4. สร้าง `Dockerfile` ใน node-todo app
```Dockerfile
FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]

```
5. สร้าง `docker-compose.yml` ใน node-todo app
```yml
version: '3'
services:
  app:
    container_name: node-todo
    restart: always
    build: .
    ports:
      - '3000:3000'
    links:
      - mongo
  mongo:
    container_name: mongo
    image: mongo:5
    ports:
    - '27017:27017'

```
6. รัน docker 
```console
$ docker-compose up -d
```

[![p2.png](https://i.postimg.cc/1zHY8nw3/p2.png)](https://postimg.cc/CZR4tKc3)


