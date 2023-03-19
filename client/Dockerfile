FROM node

WORKDIR /app_client

COPY package.json /app_client/

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# docker run -d -p 3000:3000 --rm [image_id / image_name:tag]
# docker run -d -p 3000:3000 --p -d 3000:3000 --rm gradeus_front

# docker run -d --net=host --rm gradeus-front:latest

# *if the container of the image exist -> 
# docker start [container_id / container_name]