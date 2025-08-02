FROM node:20-alpine

WORKDIR /app

# Copying dependencies & env & schema
COPY package*.json ./
COPY prisma ./prisma
COPY .env .env

# Install dependencies
RUN npm install

# Copying source code
COPY . .

# Clean old builds -- (super important)
RUN rm -rf node_modules/.prisma dist

# Generate Prisma Client
RUN npx prisma generate

# Build TS files after client is ready
RUN npm run build

# Run compiled app
CMD ["npm", "start"]