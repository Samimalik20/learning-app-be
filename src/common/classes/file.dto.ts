import { ApiProperty } from '@nestjs/swagger';

export class FileDTO {
  @ApiProperty({ type: String })
  url: string;

  @ApiProperty({ type: String })
  key: string;
}
