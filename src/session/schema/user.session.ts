import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'user_sessions', timestamps: false })
export class UserSession extends Model<UserSession> {
  @Column({ type: DataType.INTEGER })
  declare userId: number;

  @Column({ type: DataType.STRING })
 declare ip: string;

  @Column({ type: DataType.STRING })
  declare userAgent: string;

  @Column({ type: DataType.DATE })
  declare createdAt: Date;
}
