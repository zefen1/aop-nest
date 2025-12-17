import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Course {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  cover?: string;

  @Field()
  teacherId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
