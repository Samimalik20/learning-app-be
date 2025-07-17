import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ModuleQueryDto {
  @ApiProperty({ example: 'id', required: false })
  @IsString()
  @IsOptional()
  courseId: string;
}
