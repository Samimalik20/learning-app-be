import { Controller, Get } from '@nestjs/common';
import { QuestionsService } from '../service.ts/questions.service';

@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get()
  getHello(): string {
    return this.questionService.getHello();
  }
}
