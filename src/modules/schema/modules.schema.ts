import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Course } from 'src/courses/schema/course.schema';
import { Lesson } from 'src/lessons/schema/lesson.schema';
import { ModuleStatus } from '../dto/module.status';

@Table
export class Modules extends Model<Modules> {
  @ApiProperty({ example: 1 })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ApiProperty({ example: 'Advanced Async Concepts' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @ApiProperty({
    example: 'Covers Promises, Async/Await, and advanced async patterns',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;

  @ApiProperty({ example: '6-8 hours' })
  @Column({ type: DataType.STRING, allowNull: true , defaultValue:null })
  declare duration: string;



  @ApiProperty({
    enum: ModuleStatus,
    example: ModuleStatus.PUBLISHED,
  })
  @Column({
    type: DataType.ENUM(...Object.values(ModuleStatus)),
    allowNull: false,
    defaultValue: ModuleStatus.DRAFT,
  })
  declare status: ModuleStatus;

  // 🔗 Relations

  @ApiProperty({ example: 3, description: 'Related Course ID' })
  @ForeignKey(() => Course)
  @Column({ type: DataType.INTEGER })
  declare courseId: number;

  @ApiProperty({ type: () => Course })
  @BelongsTo(() => Course)
  declare course: Course;

  @ApiProperty({ type: () => [Lesson] })
  @HasMany(() => Lesson)
  declare lessons: Lesson[];
}
