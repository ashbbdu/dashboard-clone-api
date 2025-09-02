import { Model, NotNull } from 'sequelize-typescript';
import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
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
}
