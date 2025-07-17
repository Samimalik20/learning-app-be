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
import { Lesson } from 'src/lessons/schema/lesson.schema';

@Table
export class Question extends Model<Question> {
  @ApiProperty({ example: 1 })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ApiProperty({ example: 'What is the output of 1 + "2" in JavaScript?' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @ApiProperty({ example: 'Tests JavaScript type coercion' })
  @Column({ type: DataType.STRING, allowNull: true })
  declare description: string;

@ApiProperty({
  example: ['"3"', '"12"', 'NaN', 'TypeError'],
})
@Column({ type: DataType.JSON, allowNull: false })
declare options: string[];


  @ApiProperty({ example: '"3"' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare correctAnswer: string;

  // 🔗 References

  @ApiProperty({ example: 4 })
  @ForeignKey(() => Lesson)
  @Column({ type: DataType.INTEGER })
  declare lessonId: number;

  @ApiProperty({ type: () => Lesson })
  @BelongsTo(() => Lesson)
  declare lesson: Lesson;
}
