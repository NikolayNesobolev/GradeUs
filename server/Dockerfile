FROM node

WORKDIR /app_server

COPY package.json /app_server/

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]

# docker run -d -p 5000:5000 --rm [image_id / image_name:tag]
# docker run -d -p 5000:5000 --rm gradeus_back:latest

# docker run -d --net=host --rm gradeus_back:latest

# *if the container of the image exist -> 
# docker start [container_id / container_name]