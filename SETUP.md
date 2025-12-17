# 项目启动指南

## 当前状态

✅ 应用已成功配置并可以启动
✅ GraphQL API 已生成（查看 `src/schema.gql`）
✅ Prisma 数据库模型已定义

## 启动步骤

### 1. 配置数据库

确保 `.env` 文件中配置了正确的数据库连接：

```env
DATABASE_URL="postgresql://用户名:密码@localhost:5432/数据库名"
```

**如果没有数据库，可以使用 Prisma 本地数据库：**
```bash
npx prisma dev
```

### 2. 运行数据库迁移

```bash
npx prisma migrate dev --name init
```

这会创建数据库表结构。

### 3. 启动应用

```bash
# 开发模式（热重载）
yarn start:dev

# 或普通启动
yarn start
```

### 4. 访问 GraphQL Playground

打开浏览器访问：
```
http://localhost:3000/graphql
```

## 关于启动警告

你可能会看到这个警告：
```
ERROR [PackageLoader] The "@as-integrations/express5" package is missing.
```

**这个警告可以忽略！** 应用完全可以正常工作。这是因为 `@nestjs/apollo` 的新版本期望使用 Express 5，但项目使用的是 Express 4。功能不受影响。

## 数据库模型

### User（用户）
- 作为教师创建课程
- 作为学生购买课程

### Course（课程）
- 属于某个教师
- 可被多个学生购买

### UserCourse（购买记录）
- 多对多关系中间表
- 记录学生购买课程的信息

## GraphQL API 示例

详细的 API 使用示例请查看 `src/course/README.md`
