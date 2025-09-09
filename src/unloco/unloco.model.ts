import { Model } from 'sequelize';
import {
  AutoIncrement,
  Column,
  DataType,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'unloco',
})
export class Unloco extends Model<Unloco> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({
    type : DataType.STRING,
    allowNull : false
  })
declare code: string;

  @Column({
    type : DataType.STRING,
    allowNull : false
  })
  declare name: string;

  @Column({ defaultValue: true })
  declare isActive: boolean;
}
