FROM node:14.16.1

LABEL version="1.0"
LABEL description="This is the base docker image for the Titanic frontend react app."
LABEL maintainer = ["sohail.cho@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]