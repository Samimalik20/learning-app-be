import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './schema/user.schema';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { SeederService } from './seeder/seeder.service';
import { SessionModule } from 'src/session/session.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([User]), SessionModule, MailerModule],
  controllers: [UserController],
  providers: [UserService, SeederService, JwtService],
  exports: [UserService, SequelizeModule],
})
export class UserModule {}
