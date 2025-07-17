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

import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ModulesService } from '../service/modules.service';
import { Modules } from '../schema/modules.schema';
import { CreateModuleDto } from '../dto/create-module.dto';
import { UpdateModuleDto } from '../dto/update-module.dto';
import { ModuleQueryDto } from '../dto/modules.query';

@ApiTags('Modules')
@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new module' })
  @ApiResponse({ status: 201, type: Modules })
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all modules' })
  @ApiResponse({ status: 200, type: [Modules] })
  @ApiQuery({ type: ModuleQueryDto })
  findAll(
    @Query() query:ModuleQueryDto
  ) {
    return this.modulesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get module by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: Modules })
  findOne(@Param('id', ParseIntPipe) id: string):Promise<Modules> {
    const idInNumber = Number(id)
    return this.modulesService.findOne(idInNumber);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a module by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Modules })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateModuleDto: UpdateModuleDto,
  ) {
    return this.modulesService.update(id, updateModuleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a module by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.modulesService.remove(id);
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get modules by course ID' })
  @ApiParam({ name: 'courseId', type: Number })
  @ApiResponse({ status: 200, type: [Modules] })
  findByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.modulesService.findByCourseId(courseId);
  }
}
