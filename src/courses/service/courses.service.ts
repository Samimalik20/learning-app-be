import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from '../schema/course.schema';
import { CreateCourseDto } from '../dto/create.course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { S3Service } from 'src/s3/service/s3.service';
import { NameResponseDto } from '../dto/name-respone.dto';
import { Transaction } from 'sequelize'; 


@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course)
    private readonly courseModel: typeof Course,
    private readonly fileService: S3Service,
  ) {}

  async findAll() {
    return this.courseModel.findAll();
  }

  async findNames(): Promise<NameResponseDto[]> {
    return this.courseModel.findAll({
      attributes: ['id', 'title'],
    });
  }

  async create(
    dto: CreateCourseDto,
    file: Express.Multer.File,
  ): Promise<Course> {
    const uploadedFile = await this.fileService.uploadFile(file);
    const course = {
      ...dto,
      image: uploadedFile,
    };
    const newCourse = await this.courseModel.create(course as any);

    return newCourse;
  }

  async findOne(id: number) {
    const course = await this.courseModel.findByPk(id);
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: number, dto: UpdateCourseDto, file?: Express.Multer.File) {
    const course = await this.findOne(id);

    let updatedImage = course.image;
    if (file) {
      if (course.image?.url) {
        await this.fileService.deleteFile(course.image.url);
      }
      updatedImage = await this.fileService.uploadFile(file);
    }

    const dataToUpdate = {
      ...dto,
      ...(file && { image: updatedImage }),
    };

    const updatedCourse = await course.update(dataToUpdate as any);
    return updatedCourse;
  }

  async remove(id: number) {
    const course = await this.findOne(id);
    return course.destroy();
  }


// async patchTeacher(
//   teacherId: number,
//   courseId: number,
//   transaction?: Transaction,
// ): Promise<void> {

//   const course = await this.courseModel.findByPk(courseId, {
//     transaction,
//   });

//   if (!course) {
//     throw new NotFoundException('Course not found');
//   }

//   if (course.teacherId) {
//     throw new UnprocessableEntityException(
//       'This course already has a teacher assigned',
//     );
//   }

//   // await this.courseModel.update(
//   //   { teacherId },
//   //   { where: { id: courseId }, transaction }
//   // );
// }

}
