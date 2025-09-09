import {
  AutoIncrement,
  Column,
  DataType,
  NotNull,
  PrimaryKey,
  Table,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { Quote } from 'src/quote/quote.model';

@Table({
  tableName: 'unloco',
  timestamps : true
})
export class Unloco extends Model<Unloco> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({ defaultValue: true })
  declare isActive: boolean;

  @HasMany(() => Quote)
  declare quote: Quote[];
}
