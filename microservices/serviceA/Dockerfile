FROM node:16-alpine

# Copy package.json and package-lock.json
RUN mkdir -p /home/serviceA/
COPY . /home/serviceA/


RUN cd /home/serviceA/
CMD ["node", "/home/serviceA/index.js"]