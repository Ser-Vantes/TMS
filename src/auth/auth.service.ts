import { Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "../users/users.model";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {
  }

  async signin(authDto: AuthDto) {
    const user = await this.validateUser(authDto);
    return this.generateToken(user);
  }

  async signup(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException("User with this email already exist", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 8);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles
    };
    return {
      token: this.jwtService.sign(payload)
    };
  }

  private async validateUser(authDto: AuthDto) {
    const user = await this.userService.getUserByEmail(authDto.email);
    const passwordEquals = await bcrypt.compare(authDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: "Not valid password or email"
    });
  }
}
