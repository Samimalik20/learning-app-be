import { Module } from '@nestjs/common';
import { SchoolRequestsController } from './controller/school.requests.controller';
import { SchoolRequestsService } from './service/school.requests.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SchoolRequests } from './schema/school.request.schema';



@Module({
  imports:[
    SequelizeModule.forFeature([SchoolRequests])
  ],
  controllers: [SchoolRequestsController],
  providers: [SchoolRequestsService]
})
export class SchoolrequestsModule {}
