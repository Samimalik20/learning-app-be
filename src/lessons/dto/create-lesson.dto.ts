import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ example: 'Introduction to Anatomy' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'This lesson covers the basics of anatomy.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2 hours' })
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  moduleId: number;
}
