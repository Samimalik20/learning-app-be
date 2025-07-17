import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SchoolRequests } from '../schema/school.request.schema';
import { CreateSchoolRequestDto } from '../dto/create.school.request.dto';
import { UpdateSchoolRequestDto } from '../dto/update.school.request.dto';

@Injectable()
export class SchoolRequestsService {
  constructor(
    @InjectModel(SchoolRequests)
    private readonly schoolRequestModel: typeof SchoolRequests,
  ) {}

  async create(createSchoolRequestDto: CreateSchoolRequestDto) {
    return await this.schoolRequestModel.create(createSchoolRequestDto as any);
  }

  async findAll() {
    return await this.schoolRequestModel.findAll();
  }

  async findOne(id: number) {
    const request = await this.schoolRequestModel.findByPk(id);
    if (!request) {
      throw new NotFoundException(`School request with ID ${id} not found`);
    }
    return request;
  }

  async update(id: number, updateSchoolRequestDto: UpdateSchoolRequestDto) {
    const schoolRequest = await this.findOne(id);
    await schoolRequest.update(updateSchoolRequestDto);
    return schoolRequest;
  }

  async remove(id: number) {
    const deleted = await this.schoolRequestModel.destroy({
      where: { id },
    });

    if (deleted === 0) {
      throw new NotFoundException(`School request with ID ${id} not found`);
    }

    return { deleted: true };
  }
}
