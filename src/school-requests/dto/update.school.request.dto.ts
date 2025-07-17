// src/school-contact/dto/update-school-contact.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateSchoolRequestDto } from './create.school.request.dto';

export class UpdateSchoolRequestDto extends PartialType(CreateSchoolRequestDto) {}
