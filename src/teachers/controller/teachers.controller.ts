import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TeachersService } from '../service/teachers.service';
import { Teacher } from '../schema/teacher.schema';
import { CreateTeacherDto } from '../dto/create-teacher.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('teachers')
@Controller('teachers')
export class TeacherController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all teachers' })
  @ApiResponse({
    status: 200,
    description: 'All teachers list.',
    type: [Teacher],
  })
  async getAllTeachers(): Promise<Teacher[]> {
    return await this.teachersService.findAll();
  }

  // @Post()
  // @ApiOperation({ summary: 'Create a new teacher' })
  // @ApiBody({ type: CreateTeacherDto })
  // @ApiResponse({
  //   status: 201,
  //   description: 'The teacher has been successfully created.',
  //   type: Teacher,
  // })
  // async createTeacher(@Body() body: CreateTeacherDto): Promise<Teacher> {
  //   const createdUser = await this.teachersService.createTeacher(body);
  //   return createdUser;
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Update an existing course' })
  // @ApiParam({ name: 'id', type: Number })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Course updated successfully',
  //   type: Teacher,
  // })

  //  async update(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body() body: any,

  //   ) {
  //     return await this.teachersService.updateTeacher(id,body)
  //   }
}
