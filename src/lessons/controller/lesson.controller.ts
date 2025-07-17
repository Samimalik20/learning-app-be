import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { LessonsService } from '../service/lessons.service';
import { Lesson } from '../schema/lesson.schema';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { LessonQueryDto } from '../dto/lesson-query.dto';
import { UpdateLessonDto } from '../dto/update-lesson';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiResponse({ status: 201, type: Lesson })
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all lessons' })
  @ApiResponse({ status: 200, type: [Lesson] })
  @ApiQuery({ type: LessonQueryDto }) // optional
  findAll(@Query() query: LessonQueryDto) {
    return this.lessonsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lesson by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: Lesson })
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Lesson> {
    const idInNumber = Number(id);
    return this.lessonsService.findOne(idInNumber);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update lesson by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Lesson })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete lesson by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.remove(id);
  }

  @Get('module/:moduleId')
  @ApiOperation({ summary: 'Get lessons by module ID' })
  @ApiParam({ name: 'moduleId', type: Number })
  @ApiResponse({ status: 200, type: [Lesson] })
  findByModule(@Param('moduleId', ParseIntPipe) moduleId: number) {
    return this.lessonsService.findByModuleId(moduleId);
  }
}
