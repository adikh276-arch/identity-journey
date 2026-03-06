FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Final stage
FROM node:20-alpine

WORKDIR /app

# Install Nginx
RUN apk add --no-cache nginx

# Copy built frontend
COPY --from=builder /app/dist /usr/share/nginx/html/identity_journey

# Copy backend and source for tsx
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/vite-nginx.conf /etc/nginx/http.d/default.conf
COPY --from=builder /app/start.sh ./

# Adjust Nginx config for alpine location
RUN rm /etc/nginx/http.d/default.conf
COPY vite-nginx.conf /etc/nginx/http.d/default.conf

RUN chmod +x start.sh

EXPOSE 80

CMD ["./start.sh"]
