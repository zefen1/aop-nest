# AOP-NestJS 在线课程平台

基于 NestJS + Prisma + GraphQL 构建的在线课程管理系统后端 API。

## 🎯 功能特性

✅ **完整的课程管理 CRUD**
- 创建课程、查询所有课程、查询单个课程
- 按教师查询课程、更新课程、删除课程

✅ **数据库设计**
- User（用户表）- 教师和学生
- Course（课程表）- 课程信息
- UserCourse（购买记录表）- 多对多关系

✅ **GraphQL API**
- 自动生成 GraphQL Schema
- 交互式 GraphQL Playground
- 类型安全的查询和变更

## 🚀 快速开始

### 1. 安装依赖

```bash
yarn install
```

### 2. 配置数据库

编辑 `.env` 文件：

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/aop_nest_db"
```

### 3. 运行数据库迁移

```bash
npx prisma migrate dev --name init
```

### 4. 填充测试数据

```bash
yarn prisma:seed
```

**⚠️ 重要：复制输出中显示的用户 ID，测试时需要用到！**

### 5. 启动应用

```bash
yarn start:dev
```

### 6. 访问 GraphQL Playground

打开浏览器：**http://localhost:3000/graphql**

📖 **详细步骤请查看：[QUICK_START.md](./QUICK_START.md)**

## 📚 完整文档

- **[QUICK_START.md](./QUICK_START.md)** - 快速开始指南（推荐先看这个！）
- **[GRAPHQL_TESTING.md](./GRAPHQL_TESTING.md)** - GraphQL API 完整测试指南
- **[SETUP.md](./SETUP.md)** - 项目设置说明
- **[src/course/README.md](./src/course/README.md)** - Course 模块 API 文档

## 📖 GraphQL API 示例

### 查询所有课程

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

### 创建课程

```graphql
mutation {
  createCourse(createCourseInput: {
    title: "NestJS 实战教程"
    description: "从零开始学习 NestJS"
    price: 199.9
    teacherId: "你的教师ID"
  }) {
    id
    title
    price
  }
}
```

更多示例请查看 [GRAPHQL_TESTING.md](./GRAPHQL_TESTING.md)

## 🛠️ 技术栈

- **NestJS** - 渐进式 Node.js 框架
- **Prisma** - 下一代 ORM
- **GraphQL** - API 查询语言
- **Apollo Server** - GraphQL 服务器
- **PostgreSQL** - 关系型数据库
- **TypeScript** - 类型安全

## 🗂️ 项目结构

```
src/
├── prisma/              # Prisma 服务
├── course/              # 课程模块（完整 CRUD）
├── app.module.ts        # 主模块
├── main.ts              # 应用入口
└── schema.gql           # 自动生成的 GraphQL Schema

prisma/
├── schema.prisma        # 数据库模型定义
└── seed.ts              # 测试数据填充脚本
```

## 🔧 常用命令

```bash
# 开发模式启动
yarn start:dev

# 填充测试数据
yarn prisma:seed

# 打开 Prisma Studio（可视化数据库管理）
yarn prisma:studio

# 数据库迁移
npx prisma migrate dev
```

## ⚠️ 重要提示

启动时可能出现 `@as-integrations/express5` 警告，**可以忽略**，不影响功能使用！

## Description

基于 [NestJS](https://github.com/nestjs/nest) 框架构建的课程管理系统。

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
