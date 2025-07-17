import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Modules } from 'src/modules/schema/modules.schema';
import { Teacher } from 'src/teachers/schema/teacher.schema';
import { CourseStatus } from '../dto/course.status.enum';
import { FileDTO } from 'src/common/classes/file.dto';
import { CourseTeacher } from 'src/teachers/schema/course-teacher.schema';

@Table
export class Course extends Model<Course> {
  @ApiProperty({ example: 1 })
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ApiProperty({ example: 'Full Stack Web Development' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @ApiProperty({ example: 'Learn frontend and backend with real projects' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;

  @ApiProperty({ example: 500 })
  @Column({ type: DataType.STRING, allowNull: false })
  declare price: string;

  @ApiProperty({ example: '3 months' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare duration: string;

  @ApiProperty({ type: () => FileDTO })
  @Column({ type: DataType.JSON, allowNull: false })
  declare image: FileDTO;

  @ApiProperty({
    enum: CourseStatus,
    example: CourseStatus.PUBLISHED,
  })
  @Column({
    type: DataType.ENUM(...Object.values(CourseStatus)),
    allowNull: false,
    defaultValue: CourseStatus.DRAFT,
  })
  declare status: CourseStatus;

  // Relations
  @ApiProperty({ type: () => [Modules] })
  @HasMany(() => Modules)
  declare modules: Modules[];

  @ApiProperty({ type: () => [Teacher] })
  @BelongsToMany(() => Teacher, () => CourseTeacher)
  declare teachers: Teacher[];

  @ApiProperty({ example: '2024-06-25T12:34:56.789Z' })
  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @ApiProperty({ example: '2024-06-25T12:34:56.789Z' })
  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;
}
