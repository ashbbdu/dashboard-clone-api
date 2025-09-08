import { Model } from 'sequelize';
import { Column, NotNull, Table } from 'sequelize-typescript';

@Table({
   tableName : "organisations"
})
export class Organisation extends Model {
  @NotNull
  @Column
  cargowise_code: string;

  @NotNull
  @Column
  service_type: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
