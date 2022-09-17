import { Module } from '@nestjs/common';
import { LoadsController } from './loads.controller';
import { LoadsService } from './loads.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Loads } from "./loads.model";

@Module({
  controllers: [LoadsController],
  providers: [LoadsService],
  imports: [
    SequelizeModule.forFeature([Loads])
  ]
})
export class LoadsModule {}
