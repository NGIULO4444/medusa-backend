FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies (including devDependencies for build)
ENV NODE_ENV=development
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Set production for runtime
ENV NODE_ENV=production

# Expose port
EXPOSE 9000

# Start application
CMD ["yarn", "start"]
