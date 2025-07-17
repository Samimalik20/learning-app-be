import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class LessonQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  moduleId?: number;


}
