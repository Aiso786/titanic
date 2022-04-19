FROM node:14.16.1

LABEL version="1.0"
LABEL description="This is the base docker image for the Titanic backend API."
LABEL maintainer = ["sohail.cho@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]