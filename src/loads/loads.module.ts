import { Module } from '@nestjs/common';
import { LoadsController } from './loads.controller';
import { LoadsService } from './loads.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Loads } from "./loads.model";
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [LoadsController],
  providers: [LoadsService],
  imports: [
    SequelizeModule.forFeature([Loads]),
    UsersModule
  ]
})
export class LoadsModule {}
