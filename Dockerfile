FROM node:latest

COPY App.js /

CMD [ "npm", "start" ]