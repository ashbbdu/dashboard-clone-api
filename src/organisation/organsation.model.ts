import { DataType, Model } from 'sequelize-typescript';
import {
  AutoIncrement,
  Column,
  HasMany,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Quote } from 'src/quote/quote.model';

@Table({
  tableName: 'organisations',
})
export class Organisation extends Model<Organisation> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;


  @Column({
    type : DataType.TEXT,
    allowNull : false
  })
  declare cargowise_code: string;


  @Column({
    type : DataType.TEXT,
    allowNull : false
  })
  declare name : string;

  @Column({ defaultValue: true })
  declare isActive: boolean;

//   Let us fetch the quotes associated with one organisation
  @HasMany(() => Quote)
  quotes: Quote[];

}
