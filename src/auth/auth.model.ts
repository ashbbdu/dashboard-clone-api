import { HasMany, Model, NotNull } from 'sequelize-typescript';
import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Quote } from 'src/quote/quote.model';
import { RolePermission } from 'src/role_permission/role_permission.model';
import { UserRoles } from 'src/user_roles/user_role.model';

@Table({ tableName: 'users' , timestamps : true })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({ allowNull: false })
  declare firstName: string;

  @Column({ allowNull: false })
  declare lastName: string;

  @Unique
  @Column({ allowNull: false })
  declare email: string;

  @Column({ allowNull: false })
  declare password: string;

  @Unique
  @Column({ allowNull: false })
  declare user_code: string;

  @Column({ defaultValue: true })
  declare isActive: boolean;

  @HasMany(() => Quote)
  quote : Quote[];

  @HasMany (() => RolePermission)
  user_role : RolePermission[]
}
