import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseInput, UpdateCourseInput } from './course.input';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async createCourse(createCourseInput: CreateCourseInput) {
    return this.prisma.course.create({
      data: createCourseInput,
    });
  }

  async findAll() {
    return this.prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async findByTeacher(teacherId: string) {
    return this.prisma.course.findMany({
      where: { teacherId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateCourse(id: string, updateCourseInput: UpdateCourseInput) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return this.prisma.course.update({
      where: { id },
      data: updateCourseInput,
    });
  }

  async deleteCourse(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    await this.prisma.course.delete({
      where: { id },
    });

    return course;
  }
}
