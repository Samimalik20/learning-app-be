import { Module } from '@nestjs/common';
import { TeacherController } from './controller/teachers.controller';
import { TeachersService } from './service/teachers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teacher } from './schema/teacher.schema';
import { UserModule } from 'src/user/user.module';
import { CoursesModule } from 'src/courses/courses.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { CourseTeacher } from './schema/course-teacher.schema';
import { Course } from 'src/courses/schema/course.schema';

@Module({
  imports: [
    SequelizeModule.forFeature([Teacher,CourseTeacher,Course]),
    UserModule,
    CoursesModule,
    MailerModule,
  ],
  controllers: [TeacherController],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
