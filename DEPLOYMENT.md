# 部署指南 - 使用 PM2

本指南介绍如何将 NestJS 项目部署到生产服务器并使用 PM2 进行进程管理。

## 前置要求

在服务器上需要安装以下软件：

- Node.js (建议 v18+ 或 v20+)
- Yarn 或 npm
- PM2 (全局安装)
- PostgreSQL 数据库

## 1. 安装 PM2

如果服务器上还没有安装 PM2，请执行：

```bash
npm install -g pm2
```

## 2. 服务器准备

### 2.1 上传代码到服务器

使用 Git 或其他方式将代码上传到服务器：

```bash
# 使用 Git
git clone <your-repository-url>
cd aop-nest

# 或使用 rsync、scp 等工具上传
```

### 2.2 安装依赖

```bash
yarn install --production=false
```

### 2.3 配置环境变量

在服务器上创建 `.env` 文件，配置生产环境变量：

```bash
# 复制环境变量模板（如果有）
cp .env.example .env

# 编辑环境变量
nano .env
```

关键配置项：
```env
NODE_ENV=production
PORT=3000

# 数据库配置
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# 其他配置...
```

### 2.4 运行数据库迁移

```bash
# 生成 Prisma Client
npx prisma generate

# 运行数据库迁移
npx prisma migrate deploy

# 可选：填充初始数据
yarn prisma:seed
```

## 3. 构建项目

```bash
yarn build
```

## 4. 创建日志目录

PM2 配置中指定了日志目录，需要手动创建：

```bash
mkdir -p logs
```

## 5. 使用 PM2 启动应用

### 5.1 首次启动

```bash
yarn pm2:start
# 或
pm2 start ecosystem.config.js
```

### 5.2 查看运行状态

```bash
pm2 list
# 或
pm2 status
```

### 5.3 查看日志

```bash
# 查看所有日志
yarn pm2:logs

# 实时查看日志
pm2 logs aop-nest --lines 100
```

### 5.4 监控应用

```bash
# 实时监控
yarn pm2:monit

# 或使用 PM2 Plus (Web界面)
pm2 plus
```

## 6. PM2 常用命令

```bash
# 启动应用
yarn pm2:start

# 停止应用
yarn pm2:stop

# 重启应用（会有短暂停机）
yarn pm2:restart

# 平滑重载（零停机）
yarn pm2:reload

# 删除应用
yarn pm2:delete

# 查看日志
yarn pm2:logs

# 快速部署（构建 + 重启）
yarn deploy
```

## 7. PM2 进程管理配置说明

`ecosystem.config.js` 配置文件说明：

- `name`: 应用名称
- `script`: 启动脚本（编译后的入口文件）
- `instances`: 实例数量（设置为 1 或使用 CPU 核心数）
- `exec_mode`: 执行模式（cluster 或 fork）
- `autorestart`: 自动重启
- `max_memory_restart`: 内存超限自动重启
- `env`: 环境变量
- `error_file/out_file`: 日志文件路径

## 8. 开机自启动

让 PM2 在服务器重启后自动启动应用：

```bash
# 保存当前 PM2 进程列表
pm2 save

# 生成启动脚本
pm2 startup

# 根据提示执行生成的命令（需要 sudo 权限）
```

## 9. 更新部署

当代码更新时：

```bash
# 1. 拉取最新代码
git pull

# 2. 安装新依赖（如有）
yarn install

# 3. 运行数据库迁移（如有）
npx prisma migrate deploy
npx prisma generate

# 4. 构建并重启
yarn deploy
```

## 10. 性能优化建议

### 10.1 集群模式

修改 `ecosystem.config.js` 以使用多个实例：

```javascript
instances: 'max', // 或指定具体数字，如 2, 4
exec_mode: 'cluster',
```

### 10.2 启用日志轮转

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### 10.3 使用 Nginx 反向代理

创建 Nginx 配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 11. 监控和告警

### 11.1 使用 PM2 Plus

PM2 Plus 提供 Web 界面监控：

```bash
pm2 plus
# 按照提示连接到 PM2 Plus
```

### 11.2 自定义健康检查

可以在项目中添加健康检查端点：

```typescript
@Get('health')
healthCheck() {
  return { status: 'ok', timestamp: new Date() };
}
```

## 12. 故障排查

### 应用无法启动

```bash
# 查看错误日志
pm2 logs aop-nest --err

# 检查错误日志文件
cat logs/err.log
```

### 数据库连接失败

- 检查 `.env` 中的 `DATABASE_URL` 配置
- 确认数据库服务正在运行
- 检查防火墙和网络配置

### 内存泄漏

```bash
# 查看内存使用情况
pm2 monit

# 如果内存持续增长，检查代码中的内存泄漏
```

## 13. 安全建议

1. 使用环境变量管理敏感信息，不要提交 `.env` 到 Git
2. 配置防火墙，只开放必要的端口
3. 使用 HTTPS（配置 SSL 证书）
4. 定期更新依赖包
5. 启用 rate limiting 防止 API 滥用
6. 配置日志监控和异常告警

## 14. 备份策略

定期备份：
- 数据库数据
- `.env` 配置文件
- 上传的文件（如有）

```bash
# 数据库备份示例
pg_dump -U username dbname > backup_$(date +%Y%m%d).sql
```

## 参考资源

- [PM2 官方文档](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [NestJS 部署文档](https://docs.nestjs.com/faq/serverless)
- [Prisma 生产环境最佳实践](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
