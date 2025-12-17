import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCourseInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Float, { defaultValue: 0 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  cover?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  teacherId: string;
}

@InputType()
export class UpdateCourseInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  price?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  cover?: string;
}
