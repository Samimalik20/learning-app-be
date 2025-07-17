import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Role } from '../dto/role.enum';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: '+923001234567' })
  @IsPhoneNumber()
  @IsOptional()
  declare phone?: string;

  @ApiProperty({ example: '1990-05-20' })
  @IsDateString()
  @IsOptional()
  declare dob?: string;
}
