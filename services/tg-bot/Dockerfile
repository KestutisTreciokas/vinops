# S0 minimal container for vinops-tg-bot (no business logic)
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production TZ=Europe/Warsaw

# No deps yet; still run npm to generate lock if needed (no-op)
COPY package.json ./
RUN npm install --omit=dev && rm -rf /root/.npm

# App files
COPY server.js config-check.js ./

EXPOSE 8091
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://127.0.0.1:8091/health || exit 1
CMD ["node","server.js"]
