import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    Request,
    Res,
    UseGuards,
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

@ApiTags('Users')
@Controller('/api/users')
export class UsersController {

    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
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

    @ApiOperation({ summary: "Get me" })
    @ApiResponse({status: 200})
    @Roles("Broker")
    @UseGuards(RolesGuard)
    @Get("/me")
    findMe(ctx) {
        const user = this.usersService.getMe()
        return user
    }

}

