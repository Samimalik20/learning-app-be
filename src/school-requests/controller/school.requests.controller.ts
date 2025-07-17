import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSchoolRequestDto } from '../dto/create.school.request.dto';
import { UpdateSchoolRequestDto } from '../dto/update.school.request.dto';
import { SchoolRequestsService } from '../service/school.requests.service';

@ApiTags('School Requests')
@Controller('school-requests')
export class SchoolRequestsController {
  constructor(private readonly schoolRequestsService: SchoolRequestsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new school request' })
  @ApiResponse({ status: 201, description: 'School request created successfully' })
  create(@Body() createSchoolRequestDto: CreateSchoolRequestDto) {
    return this.schoolRequestsService.create(createSchoolRequestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all school requests' })
  @ApiResponse({ status: 200, description: 'List of school requests' })
  findAll() {
    return this.schoolRequestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a school request by ID' })
  @ApiResponse({ status: 200, description: 'School request data' })
  async findOne(@Param('id') id: string) {
    const request = await this.schoolRequestsService.findOne(+id);
    if (!request) {
      throw new NotFoundException(`School request with ID ${id} not found`);
    }
    return request;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a school request by ID' })
  @ApiResponse({ status: 200, description: 'School request updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() updateSchoolRequestDto: UpdateSchoolRequestDto,
  ) {
    const updatedRequest = await this.schoolRequestsService.update(+id, updateSchoolRequestDto);
    if (!updatedRequest) {
      throw new NotFoundException(`School request with ID ${id} not found`);
    }
    return updatedRequest;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a school request by ID' })
  @ApiResponse({ status: 200, description: 'School request deleted successfully' })
  async remove(@Param('id') id: string) {
    const result = await this.schoolRequestsService.remove(+id);
    if (!result) {
      throw new NotFoundException(`School request with ID ${id} not found`);
    }
    return { message: 'Deleted successfully' };
  }
}
