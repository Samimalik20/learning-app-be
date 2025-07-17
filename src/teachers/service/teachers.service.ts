import {
  Body,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTeacherDto } from '../dto/create-teacher.dto';
import { Teacher } from '../schema/teacher.schema';
import { UserService } from 'src/user/service/user.service';
import { Role } from 'src/user/dto/role.enum';
import { CoursesService } from 'src/courses/service/courses.service';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from 'src/courses/schema/course.schema';
import { User } from 'src/user/schema/user.schema';
import { MailerService } from 'src/mailer/service/mailer.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher)
    private readonly teacherModel: typeof Teacher,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Course) private readonly courseModel: typeof Course,

    private readonly sequelize: Sequelize,
    private readonly userService: UserService,
    private readonly courseService: CoursesService,
    private readonly mailerService: MailerService,
  ) {}

  async findAll(): Promise<Teacher[]> {
    return await this.teacherModel.findAll({
      include: [{ model: this.userModel }, { model: this.courseModel }],
    });
  }

  // async createTeacher(data: CreateTeacherDto): Promise<Teacher> {
  //   const foundUser = await this.userService.findByEmail(data.email);
  //   if (foundUser) {
  //     throw new UnprocessableEntityException(
  //       `User already exists with this email ${data.email}`,
  //     );
  //   }

  //   const transaction = await this.sequelize.transaction();

  //   try {
  //     const { user, password } = await this.userService.createUser(
  //       {
  //         email: data.email,
  //         fullName: data.fullName,
  //         role: Role.TEACHER,
  //         dob: data.dob,
  //       },
  //       transaction,
  //     );

  //     const createdTeacher = await this.teacherModel.create(
  //       {
  //         userId: user.id,
  //         phone: data.phone,
  //         specialization: data.specialization,
  //       } as any,
  //       { transaction },
  //     );

  //     if (data.courseId) {
  //       await this.courseService.patchTeacher(
  //         createdTeacher.id,
  //         data.courseId,
  //         transaction,
  //       );
  //     }
  //     await this.mailerService.sendEmail({
  //       to: user.email,
  //       subject: 'Welcome to our platform',
  //       template: 'teacher-onboarding',
  //       context: {
  //         name: user.fullName,
  //         email: user.email,
  //         password: password,
  //         loginUrl: 'https://your-platform.com/login',
  //       },
  //     });

  //     await transaction.commit();

  //     return createdTeacher;
  //   } catch (error) {
  //     await transaction.rollback();
  //     throw error;
  //   }
  // }
// async updateTeacher(id: number, data: any) {
//   const foundTeacher = await this.teacherModel.findByPk(id);
//   if (!foundTeacher) {
//     throw new NotFoundException(`Teacher not found with the id ${id}`);
//   }

//   const userData: any = {};
//   if (data.fullName) userData.fullName = data.fullName;
//   if (data.dob) userData.dob = data.dob;

//   if (Object.keys(userData).length > 0) {
//     await this.userService.update(foundTeacher.userId, userData);
//   }

//   const teacherData: any = {};
//   if (data.phone) teacherData.phone = data.phone;
//   if (data.specialization) teacherData.specialization = data.specialization;

//   if (Object.keys(teacherData).length > 0) {
//     await this.teacherModel.update(teacherData, { where: { id } });
//   }

//   if (data.courseId) {
//     await this.courseService.patchTeacher(id, data.courseId);
//   }

//   return { message: "Teacher updated successfully" };
// }

}
