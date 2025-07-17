import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson } from './schema/lesson.schema';

import { LessonsService } from './service/lessons.service';
import { LessonsController } from './controller/lesson.controller';

@Module({
  imports: [SequelizeModule.forFeature([Lesson])],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
