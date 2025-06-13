import { Model, QueryInterface } from "sequelize";
import { DataTypesTest, queryInterface, sequelizeInstance } from "../setup";
import migration from "../../database/migrations/20250607141656-rol";

export interface IRol extends Model {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export const getRolMock = async () => {
  await migration.up(queryInterface as QueryInterface, DataTypesTest);

  const Rols = sequelizeInstance.define<IRol>(
    "Rol",
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
  ); // Incluye timestamps y paranoid si los usas en tu modelo real

  const newRol = await Rols.create({
    name: "Test Rol",
  });

  return newRol;
};
