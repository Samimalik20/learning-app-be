import { Module } from '@nestjs/common';
import { SectionsController } from './controller/section.controller';
import { SectionsService } from './service/section.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Section } from './schema/section.schema';


@Module({
  imports:[
    SequelizeModule.forFeature([Section])
  ],
  controllers: [SectionsController],
  providers: [SectionsService],
  exports:[SectionsService]
})
export class SectionModule {}
