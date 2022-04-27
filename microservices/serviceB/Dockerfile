FROM node:16-alpine

# Copy package.json and package-lock.json
RUN mkdir -p /home/serviceB/
COPY . /home/serviceB/


RUN cd /home/serviceB/
CMD ["node", "/home/serviceB/index.js"]