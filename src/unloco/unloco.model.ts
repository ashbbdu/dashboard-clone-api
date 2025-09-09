import { Model } from 'sequelize';
import {
  AutoIncrement,
  Column,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'unloco',
})
export class Unloco extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @NotNull
  @Column
  code: string;

  @NotNull
  @Column
  name: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
