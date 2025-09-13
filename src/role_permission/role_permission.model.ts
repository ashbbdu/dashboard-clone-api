import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Permissions } from 'src/permissions/permission.model';
import { Role } from 'src/roles/role.model';

@Table({
  tableName: 'role_permissions',
  timestamps: true,
})
export class RolePermission extends Model<RolePermission> {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id: number;
  @BelongsTo(() => Role)
  declare role: Role;

  @ForeignKey(() => Permissions)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  permission_id: number;

  @BelongsTo(() => Permissions)
  declare permission : Permissions
}
