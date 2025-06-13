import { Model, QueryInterface } from "sequelize";
import migration from "../../database/migrations/20250607142616-status";
import { DataTypesTest, queryInterface, sequelizeInstance } from "../setup";

export interface IStatus extends Model {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }

  export const getStatusMock = async () => {
    await migration.up(queryInterface as QueryInterface, DataTypesTest);

    const Statuses = sequelizeInstance.define<IStatus>(
        "Status",
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
      );
  
      const newStatus = await Statuses.create({
        name: "Test Status",
        image: "test.jpg",
      });

      return newStatus;  
  }