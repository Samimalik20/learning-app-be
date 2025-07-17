// src/school-contact/dto/create-school-contact.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateSchoolRequestDto {
  @ApiProperty({
    description: 'School name',
    example: 'Greenfield High School',
  })
  @IsString()
  @Length(2, 100)
  schoolName: string;

  @ApiProperty({
    description: 'Official school email address',
    example: 'contact@greenfield.edu',
  })
  @IsEmail()
  schoolEmail: string;

  @ApiProperty({
    description: 'Full name of the contact person',
    example: 'John Doe',
  })
  @IsString()
  @Length(2, 100)
  contactPerson: string;

  @ApiProperty({
    description: 'Phone number of the contact person',
    example: '+1234567890',
  })
  @IsString()
  contactPhone: string;

  @ApiProperty({
    description: 'School location including city and country',
    example: 'New York, USA',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'School size category',
    enum: ['small', 'medium', 'large'],
    example: 'medium',
  })
  @IsEnum(['small', 'medium', 'large'])
  schoolSize: 'small' | 'medium' | 'large';

  @ApiProperty({
    description: 'Optional message or additional requirements',
    example: 'We need a partnership for workshops.',
    required: false,
  })
  @IsOptional()
  @IsString()
  message?: string;
}
