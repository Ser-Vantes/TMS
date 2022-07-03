import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {JobPosition} from "../jobPosition/jobPosition.model";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Role, JobPosition]),
      RolesModule,
      FilesModule,
      forwardRef(() => AuthModule),
  ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}
