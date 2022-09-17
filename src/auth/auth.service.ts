import {
  Headers,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { RegisterUserDto } from "../users/dto/register-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../users/users.model";
import { CreateAuthDto } from "./dto/create-auth.dto";
import {LoginTiltDto} from "./dto/login-tilt.dto";
import { RolesService } from "../roles/roles.service";
import { HttpService } from "@nestjs/axios";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AxiosResponse } from 'axios';
import * as https from "https";
import * as FormData from 'form-data'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private roleService: RolesService,
    private httpService: HttpService
  ) {}

  async login(authDto: CreateAuthDto) {
    const userVal = await this.validateUser(authDto);
    const users = await this.userService.getUserByEmail(authDto.email);
    const token = await this.generateToken(userVal);
    const roles = await this.roleService.findRoleById(users.roleId);
    const user = {
      id: users.id,
      email: users.email,
      password: users.password,
      role: roles.value,
      firstName: users.firstName,
      lastName: users.lastName,
      avatar: users.avatar,
      workingFirstName: users.workingFirstName,
      workingLastName: users.workingLastName,
      terminal: users.terminal,
      supervisor: users.supervisor,
      dateOfBirth: users.dateOfBirth,
      hiringDate: users.hiringDate,
      accountJonesMotor: users.accountJonesMotor,
      accountGreatWide: users.accountGreatWide,
      linehaulBroker: users.linehaulBroker,
      linehaulDriver: users.linehaulDriver,
      jobPosition: users.jobPosition,
    };
    return { token, user };
  }

  async registration(userDto: RegisterUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        "Пользователь с таким email существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const role = await this.roleService.getRoleByValue("Broker");
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
      roleId: role.id,
    });
    const token = await this.generateToken(user);
    return { user, token };
  }

  private async generateToken(user: User) {
    const roles = await this.roleService.findRoleById(user.roleId);
    const payload = { email: user.email, id: user.id, role: roles.value };
    return this.jwtService.sign(payload);
  }

  private async validateUser(authDto: CreateAuthDto) {
    const user = await this.userService.getUserByEmail(authDto.email);
    const passwordEquals = await bcrypt.compare(
      authDto.password,
      user.password
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: "Некорректный емайл или пароль",
    });
  }

  async findMes(head: any) {
    const authHeader = head.authorization;
    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];

    const user = this.jwtService.verify(token);
    const idsUser = user.id;
    return idsUser;
  }

  async loginTilt(tiltDto): Promise<Observable<AxiosResponse<any>>> {
    return this.httpService
      .post('https://fulltilt.transportinvestments.com/index.cfm?tilt=logonattempt',
        {
          logon: tiltDto.logon,
          Email: tiltDto.Email,
          password: tiltDto.password
        },
        {
          httpsAgent: new https.Agent({
            rejectUnauthorized: false
          })
        }
        )
      .pipe(map((response) => response.data));
  }


   async loginTiltForm(tiltDto: LoginTiltDto){
    return tiltDto
  }


  async loginTiltAxious(tiltDto: LoginTiltDto): Promise<Observable<AxiosResponse<any>>> {
    const data = new FormData();
    data.append('logon',  tiltDto.logon);
    data.append('Email',  tiltDto.Email);
    data.append('password',  tiltDto.password);

    return this.httpService.post(
      'https://fulltilt.transportinvestments.com/index.cfm?tilt=logonattempt',
      data,
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }),
        headers: {...data.getHeaders()}
      }
    ).pipe(map((response) => response.data));

  }

}


