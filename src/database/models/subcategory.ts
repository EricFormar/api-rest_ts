import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

export interface SubCategoryAttributes{

  id?: number;
  name: string;
  image: string | null;
  categoryId: number;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class SubCategory extends Model<SubCategoryAttributes> implements SubCategoryAttributes {
  
  public id!: number;
  public name!: string;
  public image!: string;
  public categoryId!: number;
  
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date;
}

SubCategory.init(
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
      allowNull: false,
      type: DataTypes.STRING,
    },
    categoryId: {
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
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: connection,
    modelName: 'SubCategory',
  }
);

// associates

export default SubCategory;