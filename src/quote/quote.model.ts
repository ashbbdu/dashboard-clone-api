import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  NotNull,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { User } from 'src/auth/auth.model';
import { Organisation } from 'src/organisation/organsation.model';
import { ServiceTypes } from 'src/servicetype/servicetype.model';
import { Unloco } from 'src/unloco/unloco.model';

interface QuoteCreationAttrs {
  quote_number: string;
  sales_executive_id: number;
  organisation_id: number;
  service_type_id: number;
  origin_id: number;
  destination_id: number;
  status: string;
  lost_reason?: string;
  remark?: string;
  notes?: string;
  quote_date?: Date;
}


@Table({ tableName: 'quotes', timestamps: true })
export class Quote extends Model<Quote , QuoteCreationAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare quote_number: string;

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

  @ForeignKey(() => ServiceTypes)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare service_type_id: number;

  @BelongsTo(() => ServiceTypes)
  declare serviceType: ServiceTypes;

  @ForeignKey(() => Unloco)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare origin_id: number;

  @BelongsTo(() => Unloco)
  declare origin: Unloco;

  @ForeignKey(() => Unloco)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare destination_id: number;

  @BelongsTo(() => Unloco)
  declare destination: Unloco;

  @Column({
    type: DataType.ENUM,
    values: ['Pending', 'Won', 'Lost'],
  })
  declare status: string;
  @Column({
    type: DataType.ENUM,
    allowNull : true,
    values: [
      'Price',
      'Service Unavailability',
      'Lost Price High',
      'Lost Transit Time',
      'Lost Space / Carrier Schedule',
      'Lost Scope Mismatch (Incoterm/Coverage)',
      'Lost Credit Terms',
      'Declined — No Buy Rate',
      'Lost Compliance (Sanctions/HS/Docs)',
      'Lost Carrier Preference',
      'No Decision — Expired',
      'Cancelled by Customer',
      'Cancelled — Shipment Aborted',
    ],
  })
  declare lost_reason: string;

  @Column({
    type: DataType.STRING,
  })
  declare remark: string;

  @Column({
    type: DataType.STRING,
  })
  declare notes: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare isActive: boolean;
}
