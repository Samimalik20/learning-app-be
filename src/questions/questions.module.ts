import { Module } from '@nestjs/common';
import { QuestionController } from './controller/question.controller';
import { QuestionsService } from './service.ts/questions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './schema/question.schema';

@Module({
  imports: [SequelizeModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
