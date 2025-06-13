import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

export interface BrandAttributes{

  id: number;
  name: string;
  image: string | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  
}

class Brand extends Model<BrandAttributes> implements BrandAttributes {
  
  public id!: number;
  public name!: string;
  public image!: string;
  
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date;
}

Brand.init(
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
    image: {
      allowNull: true,
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
    modelName: 'Brand',
  }
);

// associates

export default Brand;