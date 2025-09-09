
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  NotNull,
  PrimaryKey,
  Table,
  Model
} from 'sequelize-typescript';
import { User } from 'src/auth/auth.model';
import { Organisation } from 'src/organisation/organsation.model';

@Table({ tableName: 'quotes' , timestamps : true })
export class Quote extends Model<Quote> {

  @PrimaryKey
  @AutoIncrement
    @Column({
    type : DataType.INTEGER
  })
  declare id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare quote_date: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare sales_executive_id: number;

  @BelongsTo(() => User)
  sales_executive: User;

  @ForeignKey(() => Organisation)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare organisation_id: number;

  //   Relation to organisation model
  @BelongsTo(() => Organisation)
  declare organisation: Organisation;

  
}
