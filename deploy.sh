#!/bin/bash

# ==========================================
# Yino Project Docker 自动化部署脚本
# ==========================================

echo ">>> [1/3] 正在从 Git 拉取最新代码..."
git pull origin main

echo ">>> [2/3] 正在重构并启动 Docker 容器..."
# --build 会自动识别 frontend 和 backend 的变动并重新应用
docker compose up -d --build

echo ">>> [3/3] 正在清理过期镜像 (释放磁盘空间)..."
docker image prune -f

echo "=========================================="
echo "✅ 部署完成！"
echo "项目地址: http://yino.nuigu.club"
echo "后端状态: $(docker ps | grep backend | awk '{print $7}')"
echo "Nginx 状态: $(docker ps | grep nginx | awk '{print $7}')"
echo "=========================================="