import { ApiProperty, PartialType } from '@nestjs/swagger';


export class UpdateSectionDto {
  @ApiProperty({ example: '1' })  
   content: any
}
