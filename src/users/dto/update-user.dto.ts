import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class UpdateUserDto {

    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;

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

    // readonly roleId: number;

    readonly accountJonesMotor: string;

    readonly accountGreatWide: string;

    readonly linehaulBroker: number;

    readonly linehaulDriver: number;

}
