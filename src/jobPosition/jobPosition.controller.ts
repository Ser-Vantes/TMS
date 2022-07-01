import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import {CreateJobPositionDto} from "./dto/create-jobPosition.dto";
import {JobPositionService} from "./jobPosition.service";
import {FileInterceptor} from "@nestjs/platform-express";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { JobPosition } from "./jobPosition.model";

@Controller('jobPosition')
export class JobPositionController {

    constructor(private jobPositionService: JobPositionService) {}

    @ApiOperation({summary: 'Create JobPosition'})
    @ApiResponse({status: 200, type: [JobPosition]})
    @Roles("Broker")
    @UseGuards(RolesGuard)
    @Post()
    createJobPosition(@Body() dto: CreateJobPositionDto) {
        return this.jobPositionService.create(dto)
    }

    @ApiOperation({summary: 'Get all jobPositions'})
    @ApiResponse({status: 200, type: [JobPosition]})
    @Roles("System Owner")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.jobPositionService.getAllJobPositions();
    }

}
