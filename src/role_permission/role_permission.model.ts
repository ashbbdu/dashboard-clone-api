import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'role_permissions',
  timestamps: true,
})
export class RolePermission extends Model<RolePermission> {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  permission_id: number;
}
