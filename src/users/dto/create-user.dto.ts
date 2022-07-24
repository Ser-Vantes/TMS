import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({example: 'ser5vantes@gmail.com', description: 'email user'})
  @IsString({message: 'Must be string'})
  @IsEmail({},{message: 'Incorrect email'})
  readonly email: string

  @IsString({message: 'Must be string'})
  @Length(6,16,{message: 'Less than 4 or more than 16'})
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

  readonly accountJonesMotor: string;

  readonly accountGreatWide: string;

  readonly linehaulBroker: string;

  readonly linehaulDriver: number;
}
