import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModuleDto {
  @ApiProperty({ example: 'Advanced Async Concepts' })
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({ example: 'Advanced Async Concepts' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Covers Promises, Async/Await, and advanced async patterns',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
