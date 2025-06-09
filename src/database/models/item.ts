import { Model, DataTypes } from 'sequelize';
import connection from '../connection';
import Order from './order';
import Product from './product';

interface ItemAttributes{

  id: number;
  quantity: number;
  productId: number;
  orderId: number;

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class Item extends Model<ItemAttributes> implements ItemAttributes {
  
  public id!: number;
  public quantity!: number;
  public productId!: number;
  public orderId!: number;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date;
}

Item.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    }, 
    quantity: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    productId: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    orderId: {
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
    modelName: 'Item',
  }
);

// associates
Item.belongsTo(Order,{
  as: 'order',
  foreignKey: 'orderId'
});

Item.belongsTo(Product,{
  as: 'product',
  foreignKey: 'productId'
});

export default Item;