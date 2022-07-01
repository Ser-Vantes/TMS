import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
// import {UserRoles} from "../roles/user-roles.model";
import {User} from "../users/users.model";

interface JobCreationAttrs {
    title: string;
    color: string;
}

@Table({tableName: 'jobPosition'})
export class JobPosition extends Model<JobPosition, JobCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    color: string;

    @HasMany(() => User)
    users: User[]

}
