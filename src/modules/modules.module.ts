import { Module } from '@nestjs/common';
import { ModulesController } from './controller/modules.controller';
import { ModulesService } from './service/modules.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Modules } from './schema/modules.schema';


@Module({
  imports: [SequelizeModule.forFeature([Modules])],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
