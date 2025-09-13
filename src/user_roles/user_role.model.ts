import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/auth/auth.model";

@Table({
    tableName : "user_roles",
    timestamps : true
})
export class UserRoles extends Model <UserRoles> {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id : number

    @ForeignKey(() => User)
    @Column({
        type : DataType.INTEGER,
        allowNull : false
    })
    declare user_id : number
    @BelongsTo(() => User)
    declare user : User
}