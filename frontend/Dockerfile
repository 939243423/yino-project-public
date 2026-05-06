# 1. 使用完整版 Node 22 镜像
FROM node:22 AS build-stage

WORKDIR /app

# 2. 拷贝依赖文件
COPY package*.json ./

# 3. 使用国内镜像源安装依赖
RUN npm install --registry=https://registry.npmmirror.com

# 4. 拷贝源码并打包
COPY . .
RUN npm run build

# 5. 静态文件交给 Nginx
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
# 拷贝 nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]