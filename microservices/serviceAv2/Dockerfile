FROM node:16-alpine

# Copy package.json and package-lock.json
RUN mkdir -p /home/serviceAv2/
COPY . /home/serviceAv2/

CMD ["node", "/home/serviceAv2/index.js"]