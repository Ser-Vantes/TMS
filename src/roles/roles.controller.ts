import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from "@nestjs/common";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";

@Controller('/api/roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }

    @Get('/id/:id')
    async findOne(@Param('id') id: number){
        const role = await this.roleService.findRoleById(id);
        if (!role) {
            throw new NotFoundException('This role doesn\'t exist');
        }
        return role;
    }
}
