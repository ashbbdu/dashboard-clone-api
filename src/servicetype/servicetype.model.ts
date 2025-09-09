import { Model } from 'sequelize';
import {
  AutoIncrement,
  Column,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'service-types',
})
export class ServiceTypes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;
  @NotNull
  @Column
  cargowise_code: string;

  @NotNull
  @Column
  service_type: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
