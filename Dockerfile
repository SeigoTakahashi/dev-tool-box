FROM node:20-alpine

WORKDIR /app

# 依存関係インストール
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# Vite の開発サーバー
EXPOSE 5174

CMD ["npm", "run", "dev", "--", "--host"]