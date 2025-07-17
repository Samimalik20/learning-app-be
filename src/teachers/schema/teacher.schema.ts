import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { Course } from 'src/courses/schema/course.schema';
import { User } from 'src/user/schema/user.schema';
import { TeacherStatus } from '../dto/teacher-status.dto';
import { CourseTeacher } from './course-teacher.schema';

@Table
export class Teacher extends Model<Teacher> {
  @ApiProperty({ example: 1 })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ApiProperty({
    example: 'Aesthetic Medicine',
    description: 'Area of expertise',
  })
  @IsOptional()
  @IsString()
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  declare specialization?: string;

  @ApiProperty({
    example: '+92-300-1234567',
    description: 'Phone number of the user in international format',
  })
  @IsOptional()
  @IsString()
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  declare phone?: string;

  @ApiProperty({ example: 'MBBS, Diploma in Dermatology' })
  @IsOptional()
  @IsString()
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  declare qualification?: string;

  @ApiProperty({
    example: '5',
    description: 'Years of experience in the field',
  })
  @IsOptional()
  @IsString()
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  declare experienceYears?: string;

  @ApiProperty({
    example: 'Experienced trainer in skin aesthetics and injectables.',
  })
  @IsOptional()
  @IsString()
  @Column({ type: DataType.TEXT, allowNull: true, defaultValue: null })
  declare bio?: string;

  @ApiProperty({
    enum: TeacherStatus,
    example: TeacherStatus.ACTIVE,
  })
  @Column({
    type: DataType.ENUM(...Object.values(TeacherStatus)),
    allowNull: false,
    defaultValue: TeacherStatus.ACTIVE,
  })
  declare status: TeacherStatus;

  // 🔗 User reference
  @ApiProperty({ example: 1 })
  @IsNumber()
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  @ApiProperty({ type: () => User })
  declare user: User;

 @ApiProperty({ type: () => [Course] })
  @BelongsToMany(() => Course, () => CourseTeacher)
  courses: Course[];
}
