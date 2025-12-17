# Course GraphQL API

## 🎉 项目状态

✅ **应用已成功启动！**

虽然启动时会看到一个关于 `@as-integrations/express5` 的警告，但这不影响功能使用。GraphQL API 完全可用。

## 数据库表设计

### User 表
- `id`: 用户 ID
- `email`: 邮箱（唯一）
- `name`: 姓名
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

### Course 表
- `id`: 课程 ID
- `title`: 课程标题
- `description`: 课程描述（可选）
- `price`: 课程价格
- `cover`: 课程封面（可选）
- `teacherId`: 教师 ID（外键关联 User）
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

### UserCourse 表（购买记录）
- `id`: 记录 ID
- `userId`: 学生 ID
- `courseId`: 课程 ID
- `purchasedAt`: 购买时间

## GraphQL API 使用示例

### 查询课程列表
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

### 查询单个课程
```graphql
query {
  course(id: "课程ID") {
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

### 查询某个教师的课程
```graphql
query {
  coursesByTeacher(teacherId: "教师ID") {
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

### 创建课程
```graphql
mutation {
  createCourse(createCourseInput: {
    title: "NestJS 实战教程"
    description: "从零开始学习 NestJS 框架"
    price: 99.9
    cover: "https://example.com/cover.jpg"
    teacherId: "教师ID"
  }) {
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

### 更新课程
```graphql
mutation {
  updateCourse(
    id: "课程ID"
    updateCourseInput: {
      title: "NestJS 高级教程"
      price: 199.9
    }
  ) {
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

### 删除课程
```graphql
mutation {
  deleteCourse(id: "课程ID") {
    id
    title
  }
}
```

## 启动项目

1. 配置数据库连接（.env 文件）
```
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

2. 运行数据库迁移
```bash
npx prisma migrate dev --name init
```

3. 启动开发服务器
```bash
yarn start:dev
```

4. 访问 GraphQL Playground
```
http://localhost:3000/graphql
```
