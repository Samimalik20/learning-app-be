import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from '../schema/user.schema';
import { Role } from '../dto/role.enum';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async onModuleInit() {
    await this.seedUsers();
  }

  private async seedUsers() {
    const existing = await this.userModel.findOne({
      where: { email: 'admin@example.com' },
    });

    if (!existing) {
      const plainPassword = process.env.ADMIN_PASSWORD || 'password';
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      await this.userModel.create({
        fullName: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: Role.ADMIN,
      } as any);

      this.logger.log('✅ Default admin user seeded with hashed password.');
    } else {
      this.logger.log('ℹ️ Admin user already exists. No seeding needed.');
    }
  }
}
