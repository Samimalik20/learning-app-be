import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Section } from '../schema/section.schema';
import { CreateSectionDto } from '../dto/create-section.dto';
import { UpdateSectionDto } from '../dto/update-section.dto';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section)
    private readonly sectionModel: typeof Section,
  ) {}

  async create(dto: CreateSectionDto): Promise<Section> {
    const section = await this.sectionModel.create({ ...dto } as any);
    return section;
  }

  async findById(id: number): Promise<Section> {
    const section = await this.sectionModel.findByPk(id);
    if (!section) {
      throw new NotFoundException(`Section with id ${id} not found`);
    }
    return section;
  }

  async update(id: number, dto: UpdateSectionDto): Promise<Section> {
    const section = await this.findById(id);
    await section.update({ ...dto });
    return section;
  }

  async duplicate(id: number) {
    const foundSection = await this.findById(id);
    const newSection = await this.create({
      lessonId: foundSection.lessonId as any,
      order: foundSection.order++,
      type: foundSection.type,
      content: foundSection.content,
    });
    return newSection;
  }

  async delete(id: number): Promise<any> {
    const section = await this.findById(id);
    if (!section) {
      throw new NotFoundException('Section not found');
    }
    await section.destroy();

    return {
      data: {
        message: `Section  deleted successfully`,
      },
    };
  }
}
