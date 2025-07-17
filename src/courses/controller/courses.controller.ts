import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';
import { CoursesService } from '../service/courses.service';
import { Course } from '../schema/course.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { NameResponseDto } from '../dto/name-respone.dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({
    status: 200,
    description: 'List of all courses',
    type: [Course],
  })
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get('/by-names')
  @ApiOperation({ summary: 'Get all courses by name' })
  @ApiResponse({
    status: 200,
    description: 'List of all courses by names',
    type: [NameResponseDto],
  })
  findByNames(): Promise<NameResponseDto[]> {
    return this.courseService.findNames();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({
    status: 201,
    description: 'Course created successfully',
    type: Course,
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  create(@Body() dto: any, @UploadedFile() file: Express.Multer.File) {
    return this.courseService.create(dto, file);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing course' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Course updated successfully',
    type: Course,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(dto, 'dto in controller');
    return this.courseService.update(id, dto, file);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a course by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: Course })
  findOne(@Param('id', ParseIntPipe) id: string) {
    const idInNumber = Number(id);
    return this.courseService.findOne(idInNumber);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a course' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Course deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.remove(id);
  }
}
