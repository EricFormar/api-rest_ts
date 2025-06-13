import { Model, QueryInterface } from "sequelize";
import { DataTypesTest, queryInterface, sequelizeInstance } from "../setup";
import migrationUser from "../../database/migrations/20250607141756-user";
import { getRolMock } from "./rol.mock";

export interface IUser extends Model {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  token: string;
  lock: boolean;
  validated: boolean;
  rolId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export const getUserMock = async () => {
  await migrationUser.up(queryInterface as QueryInterface, DataTypesTest);

  const newRol = await getRolMock();

  const Users = sequelizeInstance.define<IUser>(
    "User",
    {
      id: {
        type: DataTypesTest.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypesTest.STRING,
      },
      surname: {
        type: DataTypesTest.STRING,
      },
      email: {
        type: DataTypesTest.STRING,
      },
      password: {
        type: DataTypesTest.STRING,
      },
      token: {
        type: DataTypesTest.STRING,
      },
      lock: {
        type: DataTypesTest.BOOLEAN,
      },
      image: {
        type: DataTypesTest.STRING,
      },
      validated: {
        type: DataTypesTest.BOOLEAN,
      },
      rolId: {
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

  const newUser = await Users.create({
    name: "Test User",
    surname: "Test User",
    email: "EMAIL",
    password: "test",
    image: "test.jpg",
    rolId: newRol.id,
  });

  return newUser;
};
