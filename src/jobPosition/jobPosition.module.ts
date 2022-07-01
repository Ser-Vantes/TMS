import { forwardRef, Module } from "@nestjs/common";
import { JobPositionService } from './jobPosition.service';
import { JobPositionController } from './jobPosition.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Role} from "../roles/roles.model";
// import {UserRoles} from "../roles/user-roles.model";
import {JobPosition} from "./jobPosition.model";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [JobPositionService],
  controllers: [JobPositionController],
  imports: [
    SequelizeModule.forFeature([User, JobPosition]),
    RolesModule,
    AuthModule,
  ]
})
export class JobPositionModule {}
