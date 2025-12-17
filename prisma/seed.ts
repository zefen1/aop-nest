import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 开始填充测试数据...');

  // 创建测试用户（教师）
  const teacher1 = await prisma.user.create({
    data: {
      email: 'teacher1@example.com',
      name: '张老师',
    },
  });

  const teacher2 = await prisma.user.create({
    data: {
      email: 'teacher2@example.com',
      name: '李老师',
    },
  });

  // 创建学生
  const student1 = await prisma.user.create({
    data: {
      email: 'student1@example.com',
      name: '小明',
    },
  });

  const student2 = await prisma.user.create({
    data: {
      email: 'student2@example.com',
      name: '小红',
    },
  });

  console.log('✅ 用户创建成功');

  // 创建课程
  const course1 = await prisma.course.create({
    data: {
      title: 'NestJS 入门到精通',
      description: '从零开始学习 NestJS 框架，掌握后端开发核心技能',
      price: 199.9,
      cover: 'https://example.com/nestjs-course.jpg',
      teacherId: teacher1.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'GraphQL 实战教程',
      description: '深入理解 GraphQL，构建高效的 API 服务',
      price: 299.9,
      cover: 'https://example.com/graphql-course.jpg',
      teacherId: teacher1.id,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      title: 'Prisma 数据库开发',
      description: 'Prisma ORM 完整指南，数据库操作更简单',
      price: 149.9,
      cover: 'https://example.com/prisma-course.jpg',
      teacherId: teacher2.id,
    },
  });

  console.log('✅ 课程创建成功');

  // 创建购买记录
  await prisma.userCourse.create({
    data: {
      userId: student1.id,
      courseId: course1.id,
    },
  });

  await prisma.userCourse.create({
    data: {
      userId: student1.id,
      courseId: course2.id,
    },
  });

  await prisma.userCourse.create({
    data: {
      userId: student2.id,
      courseId: course1.id,
    },
  });

  console.log('✅ 购买记录创建成功');

  console.log('\n📊 测试数据统计：');
  console.log(`- 用户: ${await prisma.user.count()} 个`);
  console.log(`- 课程: ${await prisma.course.count()} 个`);
  console.log(`- 购买记录: ${await prisma.userCourse.count()} 条`);

  console.log('\n📝 测试账号信息：');
  console.log(`教师1: ${teacher1.name} (${teacher1.email}) - ID: ${teacher1.id}`);
  console.log(`教师2: ${teacher2.name} (${teacher2.email}) - ID: ${teacher2.id}`);
  console.log(`学生1: ${student1.name} (${student1.email}) - ID: ${student1.id}`);
  console.log(`学生2: ${student2.name} (${student2.email}) - ID: ${student2.id}`);
}

main()
  .catch((e) => {
    console.error('❌ 填充数据失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
