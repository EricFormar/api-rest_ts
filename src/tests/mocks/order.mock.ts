import { Model, QueryInterface } from "sequelize";
import { getUserMock } from "./user.mock";
import { DataTypesTest, queryInterface, sequelizeInstance } from "../setup";
import migration from "../../database/migrations/20250607142724-order";
import { getStatusMock } from "./status.mock";

export interface IOrder extends Model {
  id: number;
  total: number;
  statusId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export const getOrderMock = async (): Promise<IOrder> => {
  await migration.up(queryInterface as QueryInterface, DataTypesTest);

  const newUser = await getUserMock();
  const newStatus = await getStatusMock();

  const Orders = sequelizeInstance.define<IOrder>(
    "Order",
    {
      id: {
        type: DataTypesTest.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      total: {
        type: DataTypesTest.DECIMAL,
        allowNull: false,
      },
      statusId: {
        type: DataTypesTest.INTEGER,
      },
      userId: {
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

  const newOrder = await Orders.create({
    total: 100,
    statusId: newStatus.id,
    userId: newUser.id,
  });
  return newOrder;
};
