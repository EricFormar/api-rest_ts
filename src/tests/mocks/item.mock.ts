import { Model, QueryInterface } from "sequelize";
import { DataTypesTest, queryInterface, sequelizeInstance } from "../setup";
import migration from "../../database/migrations/20250607143040-item";
import { getProductMock } from "./product.mock";
import { getOrderMock } from "./order.mock";

export interface IItem extends Model {
  id: number;
  quantity: number;
  productId: number;
  orderId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export const getItemMock = async (): Promise<IItem> => {
  await migration.up(queryInterface as QueryInterface, DataTypesTest);

  const newProduct = await getProductMock();
  const newOrder = await getOrderMock();

  const Items = sequelizeInstance.define<IItem>(
    "Item",
    {
      id: {
        type: DataTypesTest.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      quantity: {
        type: DataTypesTest.DECIMAL,
        allowNull: false,
      },
      productId: {
        type: DataTypesTest.INTEGER,
      },
      orderId: {
        type: DataTypesTest.INTEGER,
      },
      createdAt: {
        type: DataTypesTest.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypesTest.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypesTest.DATE,
        allowNull: true,
      },
    },
    { timestamps: true, paranoid: true }
  );

  const newItem = await Items.create({
    quantity: 1,
    productId: newProduct.id,
    orderId: newOrder.id,
  });
  return newItem;
};
