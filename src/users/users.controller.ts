import {
    Body,
    Controller, Delete,
    Get,
    NotFoundException,
    Param, Patch,
    Post,
    Req,
    Request,
    Res, UploadedFile, UploadedFiles,
    UseGuards, UseInterceptors,
    UsePipes
} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";
import { request } from "express";
import { JwtService } from "@nestjs/jwt";
import {UpdateUserDto} from "./dto/update-user.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('Users')
@Controller('/api/users')
export class UsersController {

    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() userDto: CreateUserDto,
           @UploadedFile() image) {
        return this.usersService.createUser(userDto,image);
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("System Owner","Broker")
    @UseGuards(RolesGuard)
    @Get('/all')
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Find user by email'})
    @ApiResponse({status: 200})
    @Roles("System Owner","Broker")
    @UseGuards(RolesGuard)
    @Get('/:email')
    getByEmail(@Param('email') email: string) {
        return this.usersService.getUserByEmail(email);
    }

    @ApiOperation({summary: 'Find user by role'})
    @ApiResponse({status: 200})
    @Roles("System Owner","Broker")
    @UseGuards(RolesGuard)
    @Get('/role/:value')
    getByRole(@Param('value') value: string) {
        return this.usersService.getUserByRole(value);
    }

    @ApiOperation({summary: 'Find user by terminal'})
    @ApiResponse({status: 200})
    @Roles("System Owner","Broker")
    @UseGuards(RolesGuard)
    @Get('/terminal/:terminal')
    getByTerminal(@Param('terminal') terminal: string) {
        return this.usersService.getUserByTerminal(terminal);
    }

    @ApiOperation({summary: 'Find user by supervisor'})
    @ApiResponse({status: 200})
    @Roles("System Owner","Broker")
    @UseGuards(RolesGuard)
    @Get('supervisor/:supervisor')
    getBySypervisor(@Param('supervisor') supervisor: string) {
        return this.usersService.getUserBySypervisor(supervisor);
    }

    @ApiOperation({summary: 'Find user by id'})
    @ApiResponse({status: 200})
    @Roles("System Owner","Broker")
    @UseGuards(RolesGuard)
    @Get('/id/:id')
    async findOne(@Param('id') id: number){
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException('This User doesn\'t exist');
        }
        return user;
    }


    @ApiOperation({summary: 'Add role'})
    @ApiResponse({status: 200})
    @Roles("System Owner")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Ban user'})
    @ApiResponse({status: 200})
    @Roles("System Owner")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }

    @ApiOperation({summary: 'Update user'})
    @ApiResponse({status: 200})
    @Roles("System Owner")
    @UseGuards(RolesGuard)
    @Patch('/:id')
    update(@Param() id: number,@Body() dto: UpdateUserDto) {
        const user = this.usersService.update(id,dto);
        const userUpdated = this.usersService.findOne(id)
        return userUpdated
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiResponse({status: 200})
    @Roles("System Owner")
    @UseGuards(RolesGuard)
    @Delete('/:id')
    delete(@Param() id: number) {
        const user = this.usersService.delete(id);
    }

}

