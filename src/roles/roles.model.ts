import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import SequelizeSlugify from "sequelize-slugify"
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
  value: string;

  description: string;
}

@Table({tableName: 'roles' })
export class Role extends Model <Role,RoleCreationAttrs> {

  @ApiProperty({example: '1', description: 'id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'admin', description: 'value'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: string;

  @ApiProperty({example: '', description: 'description'})
  @Column({type: DataType.STRING, allowNull: false, defaultValue: '12345678'})
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];

}

