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

  @Column({allowNull : false})
  cargowise_code: string;

  @Column({allowNull : false})
  service_type: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
