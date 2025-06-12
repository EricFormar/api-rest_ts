import { Model, QueryInterface } from "sequelize";
import { getUserMock } from "./user.mock";
import { DataTypesTest, queryInterface, sequelizeInstance } from "../setup";
import migration from "../../database/migrations/20250607142315-address";

export interface IAddress extends Model {
  id: number;
  location: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export const getAddressMock = async (): Promise<IAddress> => {
  await migration.up(queryInterface as QueryInterface, DataTypesTest);

  const newUser = await getUserMock();

  const Addresses = sequelizeInstance.define<IAddress>(
    "Address",
    {
      id: {
        type: DataTypesTest.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      location: {
        type: DataTypesTest.STRING,
      },
      city: {
        type: DataTypesTest.STRING,
      },
      province: {
        type: DataTypesTest.STRING,
      },
      country: {
        type: DataTypesTest.STRING,
      },
      postalCode: {
        type: DataTypesTest.STRING,
      },
      lock: {
        type: DataTypesTest.BOOLEAN,
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

  const newAddress = await Addresses.create({
    location: "Test Location",
    city: "Test City",
    province: "Test Province",
    country: "Test Country",
    postalCode: "Test Postal Code",
    userId: newUser.id,
  });
  return newAddress;
};
