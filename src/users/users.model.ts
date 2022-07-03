import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table
} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
// import {UserRoles} from "../roles/user-roles.model";
import {JobPosition} from "../jobPosition/jobPosition.model";

interface UserCreationAttrs {
    email: string;

    password: string;

    jobPositionId: number;

    roleId: number;

    firstName: string;

    lastName: string;

    avatar: string;

    workingFirstName: string;

    workingLastName: string;

    terminal?: string;

    supervisor?: string;

    dateOfBirth: string;

    hiringDate: string;

    accountJonesMotor: string;

    accountGreatWide: string;

    linehaulBroker: number;

    linehaulDriver: number;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'unique identificator'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345678', description: 'password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Ban'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: '', description: ''})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;


    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, allowNull: false})
    roleId: number

    @BelongsTo(() => Role )
    role: Role;

    @ForeignKey(() => JobPosition )
    @Column({type: DataType.INTEGER, allowNull: true})
    jobPositionId: number

    @BelongsTo(() => JobPosition)
    jobPosition: JobPosition

    @ApiProperty({example: 'Vlad', description: 'FirstName'})
    @Column({type: DataType.STRING, allowNull: false})
    firstName: string;

    @ApiProperty({example: 'Hurinchuk', description: 'LastName'})
    @Column({type: DataType.STRING, allowNull: false})
    lastName: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: true
    })
    slug: string

    @ApiProperty({example: 'icon.jpeg', description: 'Avatar'})
    @Column({type: DataType.STRING, allowNull: true, defaultValue: ''})
    avatar: string;

    @ApiProperty({example: 'Alex', description: 'workingFirstName'})
    @Column({type: DataType.STRING, allowNull: true})
    workingFirstName: string;

    @ApiProperty({example: 'Faiden', description: 'workingLastName'})
    @Column({type: DataType.STRING, allowNull: true})
    workingLastName: string;

    @ApiProperty({example: 'Alex', description: 'supervisor'})
    @Column({type: DataType.STRING, allowNull: false})
    supervisor: string;

    @ApiProperty({example: 'JonMotors', description: 'terminal'})
    @Column({type: DataType.STRING, allowNull: false})
    terminal: string;

    @ApiProperty({example: '2001-01-05', description: 'dateOfBirth'})
    @Column({type: DataType.DATEONLY, allowNull: true})
    dateOfBirth: string;

    @ApiProperty({example: '2022-01-05 04:33:12', description: 'hiringDate'})
    @Column({type: DataType.DATE, allowNull: true})
    hiringDate: string;

    @ApiProperty({example: 'vlad@motors.com', description: 'accountJonesMotor'})
    @Column({type: DataType.STRING, allowNull: true, defaultValue: ''})
    accountJonesMotor: string;

    @ApiProperty({example: 'vlad@greatwide.com', description: 'accountGreatWide'})
    @Column({type: DataType.STRING, allowNull: true,defaultValue: ''})
    accountGreatWide: string;

    @ApiProperty({example: '123', description: 'linehaulBroker'})
    @Column({type: DataType.INTEGER, allowNull: false})
    linehaulBroker: number;

    @ApiProperty({example: '458', description: 'linehaulDriver'})
    @Column({type: DataType.INTEGER, allowNull: false})
    linehaulDriver: number;
}
