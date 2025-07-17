import { ApiProperty } from '@nestjs/swagger';

export class NameResponseDto {
  @ApiProperty({ type: Number, example: '123' })
  id: number;

  @ApiProperty({ type: String, example: 'Introduction to Programming' })
  title: string;
}
