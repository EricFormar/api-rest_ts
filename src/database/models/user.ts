import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

export interface UserAttributes {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  image?: string;
  token?: string;
  locked: boolean;
  validated: boolean;
  rolId: number;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public surname!: string;
  public email!: string;
  public password!: string;
  public image?: string;
  public token?: string;
  public locked!: boolean;
  public validated!: boolean;
  public rolId!: number;
  
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    surname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
    locked: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    validated: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    rolId: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: connection,
    modelName: 'User',
  }
);

export default User;