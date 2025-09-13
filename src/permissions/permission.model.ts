import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model
} from 'sequelize-typescript';

@Table({
  tableName: 'permissions',
  timestamps: true,
})
export class Permissions extends Model<Permissions> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

@Column({ defaultValue: true })
  declare isActive: boolean;
}
