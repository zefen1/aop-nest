import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './course.model';
import { CreateCourseInput, UpdateCourseInput } from './course.input';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => Course)
  async createCourse(
    @Args('createCourseInput') createCourseInput: CreateCourseInput,
  ) {
    return this.courseService.createCourse(createCourseInput);
  }

  @Query(() => [Course], { name: 'courses' })
  async findAll() {
    return this.courseService.findAll();
  }

  @Query(() => Course, { name: 'course' })
  async findOne(@Args('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Query(() => [Course], { name: 'coursesByTeacher' })
  async findByTeacher(@Args('teacherId') teacherId: string) {
    return this.courseService.findByTeacher(teacherId);
  }

  @Mutation(() => Course)
  async updateCourse(
    @Args('id') id: string,
    @Args('updateCourseInput') updateCourseInput: UpdateCourseInput,
  ) {
    return this.courseService.updateCourse(id, updateCourseInput);
  }

  @Mutation(() => Course)
  async deleteCourse(@Args('id') id: string) {
    return this.courseService.deleteCourse(id);
  }
}
