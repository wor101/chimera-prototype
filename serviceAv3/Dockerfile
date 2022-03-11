FROM node:16-alpine

# Copy package.json and package-lock.json
RUN mkdir -p /home/serviceAv3/
COPY . /home/serviceAv3/

CMD ["node", "/home/serviceAv3/index.js"]