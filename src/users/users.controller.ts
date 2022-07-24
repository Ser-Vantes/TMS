import { Body, Controller, Get, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { ChangeRoleDto } from "./dto/change-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { ValidationException } from "../exceptions/validation.exception";
import { ValidationPipe } from "../pipes/validation.pipe";

@ApiTags('Users Routes')
@Controller("/api/users")
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  @ApiOperation({summary: 'Create User'})
  @ApiResponse({status: 200, type: User})
  @Roles('System Owner')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({summary: 'Find all users'})
  @ApiResponse({status: 200, type: [User]})
  @Roles('Supervisor')
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({summary: 'Change role'})
  @ApiResponse({status: 200})
  @Roles('Supervisor')
  @UseGuards(JwtAuthGuard)
  @Post('/role')
  changeRole(@Body() dto: ChangeRoleDto) {
    return this.usersService.changeRole(dto);
  }

  @ApiOperation({summary: 'Ban user'})
  @ApiResponse({status: 200})
  @Roles('Supervisor')
  @UseGuards(JwtAuthGuard)
  @Post('/ban')
  banUser(@Body() dto: BanUserDto) {
    return this.usersService.banUser(dto);
  }

}
