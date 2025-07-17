import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsDateString,
  IsOptional,
  IsPhoneNumber,
  IsNumber,
} from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  declare fullName: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  declare email: string;

  @ApiProperty({ example: '+923001234567' })
  @IsPhoneNumber()
  @IsOptional()
  declare phone?: string;

  @ApiProperty({ example: '1990-05-20' })
  @IsDateString()
  @IsOptional()
  declare dob?: string;


  @ApiProperty({ example: '1990-05-20' })
  @IsString()
  declare specialization: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  declare courseId?: number;
}
