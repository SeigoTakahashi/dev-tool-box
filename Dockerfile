FROM node:24.22.1-alpine

WORKDIR /app

# 依存関係インストール
COPY package*.json ./
RUN npm ci

# ソースコードをコピー
COPY . .

# Vite の開発サーバー
EXPOSE 5174

CMD ["npm", "run", "dev", "--", "--host"]