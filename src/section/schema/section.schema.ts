import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, IsOptional } from 'class-validator';
import { Lesson } from 'src/lessons/schema/lesson.schema';

export enum SectionType {
  HEADING = 'heading',
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
  DIVIDER = 'divider',
  CALLOUT = 'callout',
}

@Table
export class Section extends Model<Section> {
  @ApiProperty({ example: 1 })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ApiProperty({
    example: 'text',
    enum: SectionType,
    description: 'Type of section content',
  })
  @IsEnum(SectionType)
  @Column({
    type: DataType.ENUM(...Object.values(SectionType)),
    allowNull: false,
  })
  declare type: SectionType;

  @ApiProperty({
    type: 'object',
    description:
      'Content varies based on section type (heading, text, image, etc.)',
    example: {
      text: 'New Heading',
      level: 2,
    },
    additionalProperties: true,
  })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  content: any;

  @ApiProperty({
    example: 1,
    description: 'Order of this section within the lesson',
  })
  @IsNumber()
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare order: number;

  //relations

  @ApiProperty({ example: 'lesson-id', description: 'Related Lesson ID' })
  @ForeignKey(() => Lesson)
  @IsString()
  @Column({ type: DataType.INTEGER })
  declare lessonId: string;

  @BelongsTo(() => Lesson)
  lesson: Lesson;
}
