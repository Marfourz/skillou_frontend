# --- build ---
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- run ---
FROM node:24-alpine
WORKDIR /app
COPY --from=build /app/.output ./.output
ENV NITRO_PORT=3000
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
