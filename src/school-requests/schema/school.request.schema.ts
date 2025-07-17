import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { SchoolRequestStatus } from '../dto/school.request.status.enum';

@Table
export class SchoolRequests extends Model<SchoolRequests> {
  @ApiProperty({ example: 1 })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @ApiProperty({
    example: 'Greenfield High School',
    description: 'School name',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  schoolName: string;

  @ApiProperty({
    example: 'contact@greenfield.edu',
    description: 'School official email',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  schoolEmail: string;

  @ApiProperty({ example: 'John Doe', description: 'Contact person name' })
  @Column({ type: DataType.STRING, allowNull: false })
  contactPerson: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Contact person phone number',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  contactPhone: string;

  @ApiProperty({ example: 'New York, USA', description: 'School location' })
  @Column({ type: DataType.STRING, allowNull: false })
  location: string;

  @ApiProperty({
    example: 'medium',
    description: 'School size',
    enum: ['small', 'medium', 'large'],
  })
  @Column({
    type: DataType.ENUM('small', 'medium', 'large'),
    allowNull: false,
  })
  schoolSize: 'small' | 'medium' | 'large';

  @ApiProperty({
    example: 'We are interested in collaboration.',
    description: 'Optional message or requirements',
    required: false,
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  message?: string;


   @ApiProperty({
    example: 'pending_verification',
    description: 'Current status of the school request',
    enum: SchoolRequestStatus,
  })
  @Column({
    type: DataType.ENUM(
      SchoolRequestStatus.PENDING_VERIFICATION,
      SchoolRequestStatus.WAITING_FOR_DOCUMENTS,
      SchoolRequestStatus.UNDER_REVIEW,
      SchoolRequestStatus.APPROVED,
      SchoolRequestStatus.REJECTED
    ),
    defaultValue: SchoolRequestStatus.PENDING_VERIFICATION,
  })
  status: SchoolRequestStatus;

}
