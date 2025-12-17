# 🚀 快速开始指南

## 步骤 1: 配置数据库

编辑 `.env` 文件，配置你的数据库连接：

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/aop_nest_db"
```

**如果没有 PostgreSQL 数据库，可以使用 Prisma 本地数据库：**
```bash
npx prisma dev
```

---

## 步骤 2: 运行数据库迁移

创建数据库表结构：

```bash
npx prisma migrate dev --name init
```

---

## 步骤 3: 填充测试数据

运行以下命令添加测试用户和课程：

```bash
yarn prisma:seed
```

或者：

```bash
npx tsx prisma/seed.ts
```

**你会看到类似的输出：**
```
🌱 开始填充测试数据...
✅ 用户创建成功
✅ 课程创建成功
✅ 购买记录创建成功

📊 测试数据统计：
- 用户: 4 个
- 课程: 3 个
- 购买记录: 3 条

📝 测试账号信息：
教师1: 张老师 (teacher1@example.com) - ID: clxxxxx...
教师2: 李老师 (teacher2@example.com) - ID: clxxxxx...
学生1: 小明 (student1@example.com) - ID: clxxxxx...
学生2: 小红 (student2@example.com) - ID: clxxxxx...
```

**复制这些 ID，后面测试时会用到！**

---

## 步骤 4: 启动应用

```bash
yarn start:dev
```

看到以下输出表示启动成功：
```
[Nest] LOG [NestFactory] Starting Nest application...
[Nest] LOG [RoutesResolver] AppController {/}:
[Nest] LOG [RouterExplorer] Mapped {/, GET} route
```

---

## 步骤 5: 打开 GraphQL Playground

在浏览器中访问：**http://localhost:3000/graphql**

---

## 步骤 6: 开始测试！

### 测试 1: 查询所有课程

在 Playground 左侧输入：

```graphql
query {
  courses {
    id
    title
    description
    price
    teacherId
  }
}
```

点击中间的 ▶️ 按钮，右侧会显示所有课程！

---

### 测试 2: 创建新课程

```graphql
mutation {
  createCourse(createCourseInput: {
    title: "我的第一个课程"
    description: "这是我创建的测试课程"
    price: 99.9
    teacherId: "刚才复制的教师ID"
  }) {
    id
    title
    price
    createdAt
  }
}
```

**记得替换 `teacherId` 为你从步骤 3 复制的教师 ID！**

---

### 测试 3: 查询单个课程

```graphql
query {
  course(id: "刚创建的课程ID") {
    id
    title
    description
    price
  }
}
```

---

### 测试 4: 更新课程

```graphql
mutation {
  updateCourse(
    id: "课程ID"
    updateCourseInput: {
      price: 199.9
      description: "更新后的描述"
    }
  ) {
    id
    title
    price
    updatedAt
  }
}
```

---

### 测试 5: 查询教师的课程

```graphql
query {
  coursesByTeacher(teacherId: "教师ID") {
    id
    title
    price
  }
}
```

---

## 📚 更多示例

查看完整的测试指南：**[GRAPHQL_TESTING.md](./GRAPHQL_TESTING.md)**

---

## 🛠️ 可视化管理数据库

如果你想通过界面查看和编辑数据库：

```bash
yarn prisma:studio
```

或者：

```bash
npx prisma studio
```

浏览器会自动打开 http://localhost:5555

---

## ✅ 检查清单

- [ ] 数据库已配置（`.env` 文件）
- [ ] 数据库迁移已运行
- [ ] 测试数据已填充
- [ ] 应用已启动（http://localhost:3000）
- [ ] GraphQL Playground 可访问（http://localhost:3000/graphql）
- [ ] 已复制测试账号的 ID
- [ ] 成功执行了查询和变更操作

---

## ❓ 遇到问题？

### 问题 1: 数据库连接失败
**解决**：检查 `.env` 文件中的 `DATABASE_URL` 是否正确，确保 PostgreSQL 服务正在运行。

### 问题 2: Prisma Client 错误
**解决**：运行 `npx prisma generate` 重新生成客户端。

### 问题 3: 端口被占用
**解决**：修改 `src/main.ts` 中的端口号。

### 问题 4: 找不到 teacherId
**解决**：运行 `yarn prisma:seed` 后，终端会显示所有 ID。或者打开 Prisma Studio 查看。

---

## 🎉 恭喜！

你已经成功设置并测试了 GraphQL API！

**下一步你可以：**
- 添加用户认证
- 实现购买课程功能
- 添加评论和评分系统
- 优化查询性能
