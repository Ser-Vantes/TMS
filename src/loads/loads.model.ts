import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";

interface LoadsCreationAttrs{

  processing: boolean;

  accessorial_hd: string;

  linehaul_hd: string;

  saveandnew: string;

  ord_status: string;

  ord_status_hd: string;

  agentCode: string;

  billTo: string;

  billToCode: string;

  cmp_terms: string;

  cmp_othertype2: string;

  shipperName: string;

  shipperNameCode: string;

  consigneeName: string;

  consigneeNameCode: string;

  credit_limit: string;

  credit_available: string;

  org_address: string;

  org_address1: string;

  shipperCityState: string;

  shipperCityStateCode: string;

  shipperZip: string;

  dest_address: string;

  dest_address1: string;

  consigneeCityState: string;

  consigneeCityStateCode: string;

  consigneeZip: string;

  miles: string;

  pickupDate: string;

  pickup_time: string;

  org_stp_etd: string;

  deliveryDate: string;

  delivery_time: string;

  dest_stp_etd: string;

  trailertype: string;

  commodityCombo: string;

  commodity: string;

  ord_description: string;

  chargeItem: string;

  actualqty: string;

  actualunits: string;

  chargeqty: string;

  rate: string;

  rateunit: string;

  currency: string;

  ord_refnum: string;

  ord_reftype: string;

  showOnLoadBoard: string;

  showOnPublicLoadBoard: string;

  ord_remarks: string;

  lgh_type2: string;

  ord_dimensiontype: string;

  ord_loadlengthfeet: string;

  ord_loadlengthinches: string;

  ord_loadwidthfeet: string;

  ord_loadwidthinches: string;


  ord_loadheightfeet: string;

  ord_loadheightinches: string;

  dimensionsRequired: string;

  overLimit: string;

  carrierLimit: string;

  lineHaul: string;

  accessorials: string;

  total: string;

  needabovezerorate: string;

  tilt_loadcontact: string;

  userId: number;
}

@Table({ tableName: "loads" })
export class Loads extends Model<Loads, LoadsCreationAttrs> {

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  processing: boolean;
  @Column({ type: DataType.STRING, allowNull: false })
  accessorial_hd: string;
  @Column({ type: DataType.STRING, allowNull: false })
  linehaul_hd: string;
  @Column({ type: DataType.STRING, allowNull: false })
  saveandnew: string;
  @Column({ type: DataType.STRING, allowNull: false })
  ord_status: string;
  @Column({ type: DataType.STRING, allowNull: false })
  ord_status_hd: string;
  @Column({ type: DataType.STRING, allowNull: false })
  agentCode: string;
  @Column({ type: DataType.STRING, allowNull: false })
  billTo: string;
  @Column({ type: DataType.STRING, allowNull: false })
  billToCode: string;
  @Column({ type: DataType.STRING, allowNull: false })
  cmp_terms: string;
  @Column({ type: DataType.STRING, allowNull: false })
  cmp_othertype2: string;
  @Column({ type: DataType.STRING, allowNull: false })
  shipperName: string;
  @Column({ type: DataType.STRING, allowNull: false })
  shipperNameCode: string;
  @Column({ type: DataType.STRING, allowNull: false })
  consigneeName: string;
  @Column({ type: DataType.STRING, allowNull: false })
  consigneeNameCode: string;
  @Column({ type: DataType.STRING, allowNull: false })
  credit_limit: string;
  @Column({ type: DataType.STRING, allowNull: false })
  credit_available: string;
  @Column({ type: DataType.STRING, allowNull: false })
  org_address: string;
  @Column({ type: DataType.STRING, allowNull: false })
  org_address1: string;
  @Column({ type: DataType.STRING, allowNull: false })
  shipperCityState: string;
  @Column({ type: DataType.STRING, allowNull: false })
  shipperCityStateCode: string;
  @Column({ type: DataType.STRING, allowNull: false })
  shipperZip: string;
  @Column({ type: DataType.STRING, allowNull: false })
  dest_address: string;
  @Column({ type: DataType.STRING, allowNull: false })
  dest_address1: string;
  @Column({ type: DataType.STRING, allowNull: false })
  consigneeCityState: string;
  @Column({ type: DataType.STRING, allowNull: false })
  consigneeCityStateCode: string;
  @Column({ type: DataType.STRING, allowNull: false })
  consigneeZip: string;
  @Column({ type: DataType.STRING, allowNull: false })
  miles: string;
  @Column({ type: DataType.DATEONLY, allowNull: false })
  pickupDate: string;
  @Column({ type: DataType.DATE, allowNull: false })
  pickup_time: string;
  @Column({ type: DataType.STRING, allowNull: false })
  org_stp_etd: string;
  @Column({ type: DataType.DATEONLY, allowNull: false })
  deliveryDate: string;
  @Column({ type: DataType.TIME, allowNull: false })
  delivery_time: string;
  @Column({ type: DataType.TIME, allowNull: false })
  dest_stp_etd: string;
  @Column({ type: DataType.STRING, allowNull: false })
  trailertype: string;
  @Column({ type: DataType.STRING, allowNull: false })
  commodityCombo: string;
  @Column({ type: DataType.STRING, allowNull: false })
  commodity: string;
  @Column({ type: DataType.STRING, allowNull: false })
  ord_description: string;
  @Column({ type: DataType.STRING, allowNull: false })
  chargeItem: string;
  @Column({ type: DataType.STRING, allowNull: false })
  actualqty: string;
  @Column({ type: DataType.STRING, allowNull: false })
  actualunits: string;
  @Column({ type: DataType.STRING, allowNull: false })
  chargeqty: string;
  @Column({ type: DataType.STRING, allowNull: false })
  rate: string;
  @Column({ type: DataType.STRING, allowNull: false })
  rateunit: string;
  @Column({ type: DataType.STRING, allowNull: false })
  currency: string;
  @Column({ type: DataType.STRING, allowNull: false })
  ord_refnum: string;
  @Column({ type: DataType.STRING, allowNull: false })
  ord_reftype: string;
  @Column({ type: DataType.STRING, allowNull: false })
  showOnLoadBoard: string;
  @Column({ type: DataType.STRING, allowNull: false })
  showOnPublicLoadBoard: string;
  @Column({ type: DataType.STRING, allowNull: false })
  ord_remarks: string;
  @Column({ type: DataType.STRING, allowNull: false })
  lgh_type2: string;
  @Column({ type: DataType.STRING, allowNull: false })
  ord_dimensiontype: string;
  @Column({ type: DataType.STRING, allowNull: false })
  ord_loadlengthfeet: string;
  @Column({ type: DataType.STRING, allowNull: false })
  ord_loadlengthinches: string;
  @Column({ type: DataType.STRING, allowNull: false })
  ord_loadwidthfeet: string;
  @Column({ type: DataType.STRING, allowNull: false })
  ord_loadwidthinches: string;
  @Column({ type: DataType.STRING, allowNull: false })
  ord_loadheightfeet: string;
  @Column({ type: DataType.STRING, allowNull: false })
  ord_loadheightinches: string;
  @Column({ type: DataType.STRING, allowNull: false })
  dimensionsRequired: string;
  @Column({ type: DataType.STRING, allowNull: false })
  overLimit: string;
  @Column({ type: DataType.STRING, allowNull: false })
  carrierLimit: string;
  @Column({ type: DataType.STRING, allowNull: false })
  lineHaul: string;
  @Column({ type: DataType.STRING, allowNull: false })
  accessorials: string;
  @Column({ type: DataType.STRING, allowNull: false })
  total: string;
  @Column({ type: DataType.STRING, allowNull: false })
  needabovezerorate: string;
  @Column({ type: DataType.STRING, allowNull: false })
  tilt_loadcontact: string;

  @ForeignKey(() => User )
  @Column({type: DataType.INTEGER, allowNull: true})
  userId: number

  @BelongsTo(() => User)
  user: User

}