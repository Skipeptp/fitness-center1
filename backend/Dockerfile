FROM node:20-alpine

WORKDIR /app

# Сначала только зависимости — для кэша слоя
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Затем сорцы
COPY src ./src

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Простой healthcheck по /api/health
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", "src/app.js"]
