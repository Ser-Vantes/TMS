import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { CreateLoadsDto } from "./dto/create-loads.dto";
import { LoadsService } from "./loads.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { Loads } from "./loads.model";

@Controller('loads')
export class LoadsController {

  constructor(private loadsService: LoadsService ) {
  }

  @ApiOperation({summary: 'Create load'})
  @ApiResponse({status: 200, type: Loads})
  @Post()
  create(@Body() loadsDto: CreateLoadsDto ){
    return this.loadsService.createLoads(loadsDto);
  }

}
