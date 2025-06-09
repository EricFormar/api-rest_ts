import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

interface RolAttributes{

  id: number;
  name: string;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Rol extends Model<RolAttributes> implements RolAttributes {
  
  public id!: number;
  public name!: string;
  
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date;
}

Rol.init(
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: connection,
    modelName: 'Rol',
  }
);

// associates

export default Rol;