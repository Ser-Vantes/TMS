import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthDto } from "./dto/auth.dto";

@ApiTags("Auth Routes")
@Controller("/api/auth")
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @ApiOperation({ summary: "Login user" })
  @Post("/signin")
  signin(@Body() authDto: AuthDto) {
    return this.authService.signin(authDto);
  }

  @ApiOperation({ summary: "Register user" })
  @Post("/signup")
  signup(@Body() userDto: CreateUserDto) {
    return this.authService.signup(userDto);
  }
}
