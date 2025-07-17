import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserSession } from '../schema/user.session';


@Injectable()
export class SessionService {
  constructor(
    @InjectModel(UserSession)
    private sessionModel: typeof UserSession,
  ) {}

  async createSession(userId: number, ip: string, userAgent: string) {
    return this.sessionModel.create({
      userId,
      ip,
      userAgent,
      createdAt: new Date(),
    } as any);
  }

  async isNewSession(userId: number, ip: string, userAgent: string) {
    const session = await this.sessionModel.findOne({
      where: { userId, ip, userAgent },
    });
    return !session;
  }

  async getUserSessions(userId: number) {
    return this.sessionModel.findAll({ where: { userId } });
  }
}
