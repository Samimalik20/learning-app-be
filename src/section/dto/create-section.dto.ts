import { IsEnum, IsNumber, IsOptional, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum SectionType {
  HEADING = 'heading',
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
  DIVIDER = 'divider',
  CALLOUT = 'callout',
}

export class CreateSectionDto {
  @ApiProperty({ enum: SectionType })
  @IsEnum(SectionType)
  type: SectionType;

  @ApiProperty({ type: 'object', additionalProperties: true })
  @IsObject()
  @IsOptional()
  content?: any;

  @ApiProperty({ example: 1 })
  @IsNumber()
  order: number;

  @ApiProperty({ example: '1' })
  @IsString()
  lessonId: string;
  
}
