import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class RegisterUserDto {

  @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
  @IsString({message: 'Должно быть строкой'})
  @IsEmail({}, {message: "Некорректный email"})
  readonly email: string;

  @ApiProperty({example: '12345', description: 'пароль'})
  @IsString({message: 'Должно быть строкой'})
  @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
  readonly password: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly avatar: string;

  readonly workingFirstName: string;

  readonly workingLastName: string;

  readonly terminal: string;

  readonly supervisor: string;

  readonly dateOfBirth: string;

  readonly hiringDate: string;

  readonly jobPositionId: number;


  readonly accountJonesMotor: string;

  readonly accountGreatWide: string;

  readonly linehaulBroker: number;

  readonly linehaulDriver: number;

}
