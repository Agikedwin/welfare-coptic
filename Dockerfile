# Use the latest LTS version of Node.js
FROM node:18-alpine
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./

 
# Install dependencies
RUN npm install

#Install firebase 
RUN npm install firebase
 
# Copy the rest of your application files
COPY . .
 
# Expose the port your app runs on
EXPOSE 4000
 
# Define the command to run your app
CMD ["npm", "start"]