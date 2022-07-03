import {
  Body,
  Controller,
  ExecutionContext,
  Get,
  Header,
  Headers,
  Post,
  Res,
  UnauthorizedException
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
// import { AuthUser } from "./user.decorator";

@ApiTags("Авторизация")
@Controller("/api/auth")
export class AuthController {

  constructor(private authService: AuthService,
              private jwtService: JwtService,
              private userService: UsersService) {
  }

  @Post("/signin")
  login(@Body() authDto: CreateAuthDto) {
    return this.authService.login(authDto);
  }

  @ApiOperation({ summary: "Get me" })
  @Get("/me")
  findMe(@Headers() head) {
    const authHeader = head.authorization
    const bearer = authHeader.split(' ')[0]
    const token = authHeader.split(' ')[1]

    const user = this.jwtService.verify(token);
    const idsUser = user.id
    return this.userService.findOne(idsUser)
  }

  @ApiOperation({ summary: "Get me" })
  @Get("/mes")
  findMes(@Headers() head) {
    return this.authService.findMes(head)
  }

  @Post("/signup")
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
