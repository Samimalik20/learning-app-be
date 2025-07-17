import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { randomBytes } from 'crypto';

import * as bcrypt from 'bcrypt';
import { User } from '../schema/user.schema';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { Transaction } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    // private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private async generateRandomPassword(length = 6): Promise<string> {
    return randomBytes(length)
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, length);
  }

  private async comparePasswords(
    plain: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  async register(dto: SignUpDto): Promise<User> {
    const hashedPassword = await this.hashPassword(dto.password);
    const user = await this.userModel.create({
      ...dto,
      password: hashedPassword,
    } as any);
    return user;
  }
  async createUser(
    dto: CreateUserDto,
    transaction?: Transaction,
  ): Promise<any> {
    const password = await this.generateRandomPassword();
    const hashedPassword = await this.hashPassword(password);

    const user = await this.userModel.create(
      {
        ...dto,
        password: hashedPassword,
      } as any,
      transaction ? { transaction } : {},
    );

    return { user, password };
  }

  async login(dto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({ where: { email: dto.email } });

    if (!user || !(await this.comparePasswords(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    // const token = this.jwtService.sign(payload);

    return { access_token: '' };
  }

  // ✅ Get all users
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  // ✅ Get single user
  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  // ✅ Update user
  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    await user.update(dto);
    return user;
  }

  // ✅ Delete user
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
