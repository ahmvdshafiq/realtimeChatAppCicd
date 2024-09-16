# Use an official node runtime as a parent image
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Change permissions of the .npm directory
RUN mkdir -p /.npm && chown -R node:node /.npm

# Use a non-root user to run the app
USER node

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "app.js" ]
