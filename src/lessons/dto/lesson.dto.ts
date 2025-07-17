// src/lessons/schema/lesson-content.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class LessonResource {
  @ApiProperty({ example: 'Event Loop Visualization' })
  @IsString()
  name: string;

  @ApiProperty({ example: '/event-loop.html' })
  @IsString()
  url: string;

  @ApiProperty({ example: 'file' })
  @IsString()
  type: string;
}

export class LessonContent {
  @ApiProperty({ example: 'https://example.com/video.mp4' })
  @IsString()
  videoUrl: string;

  @ApiProperty({ type: [LessonResource] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LessonResource)
  resources: LessonResource[];
}
