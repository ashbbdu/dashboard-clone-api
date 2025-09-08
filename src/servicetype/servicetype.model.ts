import { Model } from 'sequelize';
import { Column, NotNull, Table } from 'sequelize-typescript';

@Table({
   tableName : "service-types"
})
export class ServiceTypes extends Model {
  @NotNull
  @Column
  cargowise_code: string;

  @NotNull
  @Column
  service_type: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
