import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

export interface ImageAttributes{

  id: number;
  file: string;
  productId: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

class Image extends Model<ImageAttributes> implements ImageAttributes {
  
  public id!: number;
  public file!: string;
  public productId!: number;
  
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date;
}

Image.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    }, 
    file: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    productId: {
      allowNull: true,
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
    modelName: 'Image',
  }
);

// associates

export default Image;