import { Module } from '@nestjs/common';
import { CoursesController } from './controller/courses.controller';
import { CoursesService } from './service/courses.service';
import { Course } from './schema/course.schema';
import { SequelizeModule } from '@nestjs/sequelize';
import { S3Module } from 'src/s3/s3.module';
import { CourseTeacher } from 'src/teachers/schema/course-teacher.schema';
import { Teacher } from 'src/teachers/schema/teacher.schema';

@Module({
  imports: [SequelizeModule.forFeature([Course,CourseTeacher,Teacher]), S3Module],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService, SequelizeModule],
})
export class CoursesModule {}
