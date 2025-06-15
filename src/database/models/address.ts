import { Model, DataTypes } from 'sequelize';
import connection from '../connection';
import User from './user';

export interface AddressAttributes{

  id: number;
  location: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  userId: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

class Address extends Model<AddressAttributes> implements AddressAttributes {
  
  public id!: number;
  public location!: string;
  public city!: string;
  public province!: string;
  public postalCode!: string;
  public country!: string;
  public userId!: number;
  
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date;
}

Address.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    }, 
    location: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    province: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    postalCode: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    country: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: connection,
    modelName: 'Address',
  }
);

// associates

export default Address;