import { Model, DataTypes } from 'sequelize';
import connection from '../connection';
import Section from './section';
import Brand from './brand';
import Category from './category';
import SubCategory from './subcategory';
import Image from './image';
import { IProduct } from '../../interfaces/IProduct';

class Product extends Model<IProduct> implements IProduct {
  
  public id!: number;
  public name!: string;
  public price!: number;
  public discount!: number;
  public description!: string;
  public brandId!: number;
  public categoryId!: number;
  public subcategoryId!: number;
  public sectionId!: number;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date;
}

Product.init(
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
    price: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    discount: {
      allowNull: true,
      defaultValue: 0,
      type: DataTypes.NUMBER,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    brandId: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    subcategoryId: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    sectionId: {
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
    modelName: 'Product',
  }
);

// associates

Product.belongsTo(Brand, {
  foreignKey:'brandId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: "brand",
});

Product.belongsTo(Category, {
  foreignKey:'categoryId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: "category",
});

Product.belongsTo(SubCategory, {
  foreignKey:'subcategoryId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: "subcategory",
});

Product.belongsTo(Section, {
  foreignKey: 'sectionId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: "section",
});

Product.hasMany(Image, {
  foreignKey:'productId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: "images",
});

export default Product;