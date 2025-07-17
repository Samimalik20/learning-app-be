import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from '../schema/lesson.schema';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { LessonQueryDto } from '../dto/lesson-query.dto';
import { UpdateLessonDto } from '../dto/update-lesson';
import { Section } from 'src/section/schema/section.schema';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson)
    private readonly lessonModel: typeof Lesson,
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonModel.create(createLessonDto as any);
  }

  async findAll(query?: LessonQueryDto): Promise<Lesson[]> {
    const where: any = {};
    if (query?.moduleId) {
      where.moduleId = query.moduleId;
    }

    return this.lessonModel.findAll({
      where,
    });
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonModel.findByPk(id,{
      include:[Section]
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.findOne(id);
    return lesson.update(updateLessonDto);
  }

  async remove(id: number): Promise<void> {
    const lesson = await this.findOne(id);
    await lesson.destroy();
  }

  async findByModuleId(moduleId: number): Promise<Lesson[]> {
    return this.lessonModel.findAll({
      where: { moduleId },
      order: [['order', 'ASC']],
    });
  }
}
