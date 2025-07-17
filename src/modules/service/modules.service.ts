import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Modules } from '../schema/modules.schema';
import { CreateModuleDto } from '../dto/create-module.dto';
import { UpdateModuleDto } from '../dto/update-module.dto';
import { ModuleQueryDto } from '../dto/modules.query';
import { Lesson } from 'src/lessons/schema/lesson.schema';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Modules)
    private readonly modulesModel: typeof Modules,
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<Modules> {
    return this.modulesModel.create(createModuleDto as any);
  }

  async findAll(query?: ModuleQueryDto): Promise<Modules[]> {
    const courseID = query?.courseId;

    const filter: any = {};
    if (courseID) {
      filter.courseId = courseID;
    }

    return this.modulesModel.findAll({
      where: filter,
      include: { all: true },
    });
  }

  async findOne(id: number): Promise<Modules> {
    const module = await this.modulesModel.findByPk(id, {
      include: [Lesson],
    });
    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    return module;
  }

  async update(id: number, updateModuleDto: UpdateModuleDto): Promise<Modules> {
    const module = await this.findOne(id);
    return module.update(updateModuleDto as any);
  }

  async remove(id: number): Promise<void> {
    const module = await this.findOne(id);
    await module.destroy();
  }

  async findByCourseId(courseId: number): Promise<Modules[]> {
    return this.modulesModel.findAll({
      where: { courseId },
      include: { all: true },
    
    });
  }
}
