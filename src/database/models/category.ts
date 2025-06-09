import { Model, DataTypes } from 'sequelize';
import connection from '../connection';
import SubCategory from './subcategory';

export interface CategoryAttributes{

  id: number;
  name: string;
  image: string;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  
  public id!: number;
  public name!: string;
  public image!: string;
  
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date;
}

Category.init(
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
    modelName: 'Category',
  }
);

// associates
Category.hasMany(SubCategory,{
  foreignKey: 'categoryId',
  as: 'subcategories',
})

export default Category;