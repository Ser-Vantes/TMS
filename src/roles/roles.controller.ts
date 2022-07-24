import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Role Routes")
@Controller("/api/roles")
export class RolesController {
  constructor(private rolesService: RolesService) {
  }

  @ApiOperation({summary: 'Create role'})
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @ApiOperation({summary: 'Get role by value'})
  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.rolesService.getAllByValue(value);
  }

}
