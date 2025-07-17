import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSession } from './schema/user.session';
import { SessionService } from './service/session.service';
import { MailerService } from 'src/mailer/service/mailer.service';


@Module({
  imports: [SequelizeModule.forFeature([UserSession])],
  providers: [SessionService,MailerService],
  exports:[SessionService]
})
export class SessionModule {}
