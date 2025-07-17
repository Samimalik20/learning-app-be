import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Course } from 'src/courses/schema/course.schema';
import { Teacher } from './teacher.schema';

@Table
export class CourseTeacher extends Model<CourseTeacher> {
  @ApiProperty()
  @ForeignKey(() => Course)
  @Column
  courseId: number;

  @ApiProperty()
  @ForeignKey(() => Teacher)
  @Column
  teacherId: number;
}
