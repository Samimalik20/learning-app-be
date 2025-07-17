
import { Table, Column, Model, DataType,UpdatedAt,CreatedAt } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { Role } from '../dto/role.enum';
import { FileDTO } from 'src/common/classes/file.dto';
import { Type } from 'class-transformer';

@Table
export class User extends Model<User> {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @Column({ type: DataType.STRING, allowNull: false })
  declare fullName: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;

  @ApiProperty({ example: 'hashedpassword123' })
  @IsString()
  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @ApiProperty({
    example: '1990-05-20',
    description: 'Date of birth in YYYY-MM-DD format',
    type: String,
  })
  @IsDateString()
  @Column({ type: DataType.DATEONLY, allowNull: true })
  declare dob: string;

  @ApiProperty({ type: () => FileDTO })
  @Type(() => FileDTO)
  @Column({ type: DataType.JSON, allowNull: true, defaultValue:null })
  declare profile: FileDTO;

  @ApiProperty({ enum: Role, example: Role.TEACHER })
  @IsEnum(Role)
  @Column({ type: DataType.ENUM(...Object.values(Role)), allowNull: false })
  declare role: Role;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare isVerified: boolean;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  declare isActive: boolean;


  @ApiProperty({ example: '2024-06-25T12:34:56.789Z' })
  @CreatedAt
  @Column({ type: DataType.DATE })
  declare createdAt: Date;

  @ApiProperty({ example: '2024-06-25T12:34:56.789Z' })
  @UpdatedAt
  @Column({ type: DataType.DATE })
  declare updatedAt: Date;
}
