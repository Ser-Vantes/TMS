import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import SequelizeSlugify from "sequelize-slugify"
import { ApiProperty } from "@nestjs/swagger";

interface JobPositionCreationAttrs {
  value: string;
  description: string;
}

@Table({tableName: 'roles' })
export class JobPosition extends Model <JobPosition,JobPositionCreationAttrs> {

  @ApiProperty({example: '1', description: 'id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'admin', description: 'value'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: string;

  @ApiProperty({example: '', description: 'description'})
  @Column({type: DataType.STRING, allowNull: false, defaultValue: '12345678'})
  description: string;
}

