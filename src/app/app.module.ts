import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from 'src/courses/courses.module';
import { TeachersModule } from 'src/teachers/teachers.module';
import { ModulesModule } from 'src/modules/modules.module';
import { LessonsModule } from 'src/lessons/lessons.module';
import { QuestionsModule } from 'src/questions/questions.module';
import { S3Module } from 'src/s3/s3.module';
import { UserModule } from 'src/user/user.module';
import { SectionModule } from 'src/section/section.module';
import { SchoolrequestsModule } from 'src/school-requests/school.requests.module';
import { SessionModule } from 'src/session/session.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    CoursesModule,
    TeachersModule,
    ModulesModule,
    LessonsModule,
    QuestionsModule,
    SectionModule,
    S3Module,
    SchoolrequestsModule,
    SessionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
