import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Role } from './role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: Role,
    example: Role.STUDENT,
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ example: '+923001234567' })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: '1990-05-20' })
  @IsDateString()
  @IsOptional()
  dob?: string;
}
