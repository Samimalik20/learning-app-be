import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Modules } from 'src/modules/schema/modules.schema';
import { Question } from 'src/questions/schema/question.schema';
import { LessonContent } from '../dto/lesson.dto';
import { Section } from 'src/section/schema/section.schema';

@Table
export class Lesson extends Model<Lesson> {
  @ApiProperty({ example: 1 })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ApiProperty({ example: 'Understanding the Event Loop' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @ApiProperty({ example: 'How JavaScript handles asynchronous operations' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;


  @ApiProperty({ example: '2 hours' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare duration: string;
  

  // 🔗 Relations
  @ApiProperty({ example: 5 })
  @ForeignKey(() => Modules)
  @Column({ type: DataType.INTEGER })
  declare moduleId: number;

  @ApiProperty({ type: () => Modules })
  @BelongsTo(() => Modules)
  declare module: Modules;

  @ApiProperty({ type: () => [Question] })
  @HasMany(() => Question)
  declare questions: Question[];

  @ApiProperty({ type: () => [Section] })
  @HasMany(() => Section)
  declare sections: Section[];
}
