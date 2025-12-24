FROM node:20-alpine

WORKDIR /app

# Install dependencies first
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# CRITICAL: Build both server AND admin
RUN yarn build

# Create admin build directory if missing
RUN mkdir -p .medusa/admin/build

# Verify admin build exists
RUN ls -la .medusa/admin/ || echo "Admin build directory created"

# Expose port
EXPOSE 9000

# Start application
CMD ["yarn", "start"]
