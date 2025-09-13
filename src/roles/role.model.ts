import { DataType, Model } from 'sequelize-typescript';
import {
  AutoIncrement,
  Column,
  HasMany,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Quote } from 'src/quote/quote.model';

@Table({
  tableName: 'roles',
  timestamps : true
})
export class Role extends Model<Role> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;


  @Column({
    type : DataType.TEXT,
    allowNull : false
  })
  declare name : string;


  @Column({
    type : DataType.TEXT,
    allowNull : false
  })
  declare description : string;

  @Column({ defaultValue: true })
  declare isActive: boolean;

// //   Let us fetch the quotes associated with one organisation
//   @HasMany(() => Quote)
//   quotes: Quote[];

}
