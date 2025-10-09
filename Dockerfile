# Étape 1 : construction
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Étape 2 : image finale
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./
RUN apk add --no-cache curl
EXPOSE 5000
CMD ["npm", "start"]