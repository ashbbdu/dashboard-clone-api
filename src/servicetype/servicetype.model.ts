import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Model,
  HasMany
} from 'sequelize-typescript';
import { Quote } from 'src/quote/quote.model';

@Table({
  tableName: 'service-types',
})
export class ServiceTypes extends Model<ServiceTypes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({allowNull : false})
  declare cargowise_code: string;

  @Column({allowNull : false})
  declare service_type: string;

  @Column({ defaultValue: true })
  declare isActive: boolean;

  @HasMany(() => Quote)
  declare quote : Quote[]
}
