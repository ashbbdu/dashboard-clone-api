import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { RolePermission } from 'src/role_permission/role_permission.model';
import { Role } from 'src/roles/role.model';

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

  @BelongsToMany(() => Role, () => RolePermission)
  roles: Role[];
}
