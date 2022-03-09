FROM node:16-alpine

# Copy package.json and package-lock.json
RUN mkdir -p /home/getTime/
COPY . /home/getTime/


RUN cd /home/getTime/
CMD ["node", "/home/getTime/index.js"]