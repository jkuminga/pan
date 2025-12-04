# Lightweight Node.js image for production
FROM node:20-alpine

# App directory
WORKDIR /app

# Install dependencies first (leverages Docker layer caching)
COPY package.json ./
RUN npm install --omit=dev

# Copy source
COPY . .

# Environment
ENV NODE_ENV=production

# Expose app port
EXPOSE 3001

# Start server
CMD ["node", "server.js"]
