# Yino 项目部署指南 (Docker 工业级版)

本指南旨在指导如何利用 Docker 容器化技术，将项目快速部署到 Linux 服务器上。

## 1. 准备工作

确保服务器已安装以下基础设施：
- **Docker**: v20.10+
- **Docker Compose**: v2.0+
- **Git**: 用于同步代码

## 2. 自动化一键部署

1. **获取代码**：
   ```bash
   git clone https://github.com/xxx/yino-project.git
   cd yino-project
   npm i
   ```

2. **配置环境 (.env)**：
由于 `.env` 包含敏感信息，未纳入 Git 管理。请手动在 `backend` 目录下创建：
   ```bash
   nano backend/.env
   ```
写入以下核心配置：
   ```env
   NODE_ENV=production
   PORT=3000
   JWT_SECRET=yino_secret_key_2026
   BAIDU_APP_ID=xxxx
   BAIDU_API_KEY=your_baidu_api_key
   ```
同时，`docker-compose.yml` 已配置为自动加载此文件。

3. **执行部署脚本**：
本项目采用 多阶段构建 (Multi-stage Build) 方案，Docker 会自动在隔离的容器内完成前端环境安装与打包，确保生产环境纯净。

   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```
4. **从git上解决权限执行部署脚本**：
   ```bash
   git update-index --chmod=+x deploy.sh
   ```
### 部署逻辑解析
- **前端 (Frontend)**: 基于 `node:22` 镜像自动执行 `npm run build`，编译产物直接移交给内置的 Nginx 容器。
- **后端 (Backend)**: 基于 Node.js 镜像运行，通过 Docker 内部网络与前端通信。
- **持久化 (Persistence)**: 数据库 `yino.db` 和 `uploads/` 目录通过 Volume 映射到宿主机，执行更新脚本不会导致数据丢失。

## 3. 环境配置与微调
- **域名配置**：修改 `frontend/nginx.conf` 中的 `server_name` 为你的实际域名。
- **SSL/HTTPS 设置**：
    - **原生方案**：若直接在 Nginx 配置证书，需将 `.pem` 和 `.key` 文件放入 `frontend` 目录并在 `Dockerfile` 中添加 `COPY` 指令。

- **数据迁移 (手动)**：
若需同步本地现有的 `yino.db` 到服务器：
   ```bash
   # 在本地执行
   scp ./backend/data/yino.db root@你的服务器IP:/var/www/yino-project/backend/data/yino.db
   # 在服务器重启后端生效
   docker compose restart backend
   ```

## 4. 运维常用命令
- **查看服务状态**：`docker ps`
- **查看实时日志**：`docker compose logs -f`
- **停止所有服务**：`docker compose down`
- **强制重新构建**：`docker compose up -d --build`

## 5. 初始账号
- **地址**: `http://域名或IP/admin/login`
- **账号**: `admin`
- **密码**: `admin123`
