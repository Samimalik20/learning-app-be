import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Patch,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateSectionDto } from '../dto/create-section.dto';
import { Section } from '../schema/section.schema';
import { UpdateSectionDto } from '../dto/update-section.dto';
import { SectionsService } from '../service/section.service';

@ApiTags('Sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a section' })
  @ApiBody({
    description: 'Section data',
    type: CreateSectionDto,
    examples: {
      heading: {
        summary: 'Heading section',
        value: {
          type: 'heading',
          order: 1,
          content: { text: 'New Heading', level: 2 },
        },
      },
      text: {
        summary: 'Text section',
        value: {
          type: 'text',
          order: 2,
          content: { html: '<p>Start typing...</p>' },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Section created', type: Section })
  create(@Body() dto: CreateSectionDto) {
    return this.sectionsService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a section by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Section found', type: Section })
  getById(@Param('id') id: number) {
    return this.sectionsService.findById(id);
  }

  @Post(':id')
  @ApiOperation({ summary: 'Duplicate  a section by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 201, description: 'Section found', type: Section })
  duplicateById(@Param('id') id: number) {
    return this.sectionsService.duplicate(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a section by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateSectionDto })
  @ApiResponse({ status: 200, description: 'Section updated', type: Section })
  update(@Param('id') id: number, @Body() dto: UpdateSectionDto) {
    return this.sectionsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a section by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Section deleted' })
  @HttpCode(200)
  delete(@Param('id') id: number) {
    return this.sectionsService.delete(id);
  }
}
