# GraphQL API 测试指南

## 🚀 快速开始

### 1. 准备数据库和测试数据

```bash
# 运行数据库迁移（创建表结构）
npx prisma migrate dev --name init

# 填充测试数据
npx tsx prisma/seed.ts
```

### 2. 启动应用

```bash
yarn start:dev
```

### 3. 访问 GraphQL Playground

打开浏览器访问：**http://localhost:3000/graphql**

## 📖 在 GraphQL Playground 中测试

GraphQL Playground 是一个交互式的 GraphQL IDE，你可以在左侧编写查询，点击中间的播放按钮执行，右侧会显示结果。

---

## 📚 查询操作（Query）

### 1. 查询所有课程

在左侧输入框中输入：

```graphql
query {
  courses {
    id
    title
    description
    price
    cover
    teacherId
    createdAt
    updatedAt
  }
}
```

点击播放按钮，右侧会显示所有课程列表。

---

### 2. 查询单个课程

```graphql
query {
  course(id: "课程ID") {
    id
    title
    description
    price
    teacherId
  }
}
```

**注意**：将 `"课程ID"` 替换为实际的课程 ID（运行测试数据后会显示）

---

### 3. 查询某个教师的所有课程

```graphql
query {
  coursesByTeacher(teacherId: "教师ID") {
    id
    title
    description
    price
  }
}
```

**注意**：将 `"教师ID"` 替换为实际的教师 ID

---

## ✏️ 变更操作（Mutation）

### 1. 创建新课程

```graphql
mutation {
  createCourse(createCourseInput: {
    title: "React 高级开发"
    description: "深入学习 React 18 新特性和最佳实践"
    price: 399.9
    cover: "https://example.com/react-course.jpg"
    teacherId: "教师ID"
  }) {
    id
    title
    description
    price
    teacherId
    createdAt
  }
}
```

**注意**：将 `teacherId` 替换为实际的教师 ID

---

### 2. 更新课程

```graphql
mutation {
  updateCourse(
    id: "课程ID"
    updateCourseInput: {
      title: "React 高级开发（更新版）"
      price: 499.9
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

### 3. 删除课程

```graphql
mutation {
  deleteCourse(id: "课程ID") {
    id
    title
  }
}
```

---

## 🎯 使用变量（推荐方式）

在 GraphQL Playground 中，你可以使用变量让查询更灵活。

### 示例：使用变量查询课程

**查询（左上方）：**
```graphql
query GetCourse($courseId: String!) {
  course(id: $courseId) {
    id
    title
    description
    price
  }
}
```

**变量（左下方 "QUERY VARIABLES" 标签）：**
```json
{
  "courseId": "实际的课程ID"
}
```

---

### 示例：使用变量创建课程

**变更（左上方）：**
```graphql
mutation CreateNewCourse($input: CreateCourseInput!) {
  createCourse(createCourseInput: $input) {
    id
    title
    price
    createdAt
  }
}
```

**变量（左下方）：**
```json
{
  "input": {
    "title": "Vue 3 完整指南",
    "description": "从基础到高级，全面掌握 Vue 3",
    "price": 299.9,
    "cover": "https://example.com/vue-course.jpg",
    "teacherId": "实际的教师ID"
  }
}
```

---

## 🔍 查看 Schema 文档

在 GraphQL Playground 右侧，点击 **"DOCS"** 或 **"SCHEMA"** 标签，可以查看：
- 所有可用的查询和变更
- 每个字段的类型
- 输入参数的定义

---

## 💡 实用技巧

### 1. 自动补全

在输入查询时，按 `Ctrl + Space` 可以触发自动补全。

### 2. 格式化代码

按 `Ctrl + Shift + P`（Windows）或 `Cmd + Shift + P`（Mac）可以格式化查询。

### 3. 执行历史

点击 Playground 顶部的时钟图标，可以查看历史执行记录。

### 4. 查询别名

可以在同一个请求中执行多个查询：

```graphql
query {
  allCourses: courses {
    id
    title
  }

  specificCourse: course(id: "课程ID") {
    id
    title
    price
  }
}
```

---

## 🛠️ 使用 Prisma Studio（可选）

如果你想可视化查看和管理数据库数据：

```bash
npx prisma studio
```

这会在浏览器中打开 `http://localhost:5555`，提供数据库的可视化界面。

---

## 📝 完整测试流程示例

```graphql
# 1. 先查询所有课程
query {
  courses {
    id
    title
    teacherId
  }
}

# 2. 创建一个新课程
mutation {
  createCourse(createCourseInput: {
    title: "测试课程"
    description: "这是一个测试课程"
    price: 99.9
    teacherId: "从上面查询到的教师ID"
  }) {
    id
    title
  }
}

# 3. 查询刚创建的课程
query {
  course(id: "刚创建的课程ID") {
    id
    title
    description
    price
  }
}

# 4. 更新课程
mutation {
  updateCourse(
    id: "课程ID"
    updateCourseInput: {
      price: 149.9
    }
  ) {
    id
    price
  }
}

# 5. 删除课程
mutation {
  deleteCourse(id: "课程ID") {
    id
    title
  }
}
```

---

## ❓ 常见问题

**Q: 为什么我的变更没有生效？**
A: 确保你的 ID 是正确的，并且数据库已经迁移完成。

**Q: 如何获取用户/课程的 ID？**
A: 运行 `npx tsx prisma/seed.ts` 后会在终端显示所有 ID，或者使用 Prisma Studio 查看。

**Q: 启动时出现数据库连接错误？**
A: 检查 `.env` 文件中的 `DATABASE_URL` 是否正确。

---

## 🎉 现在开始测试吧！

1. 确保应用正在运行：`yarn start:dev`
2. 打开浏览器：http://localhost:3000/graphql
3. 复制上面的查询示例到 Playground
4. 点击播放按钮执行！
