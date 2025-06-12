import { Model, QueryInterface } from "sequelize";
import { DataTypesTest, queryInterface, sequelizeInstance } from "../setup";
import migration from "../../database/migrations/20250607110250-brand";

export interface IBrand extends Model {
    id: number;
    name: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }
export const getBrandMock = async () => {

    await migration.up(queryInterface as QueryInterface, DataTypesTest);
    
    const Brands = sequelizeInstance.define<IBrand>(
        "Brand",
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
          image: {
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
  
      const newBrand = await Brands.create({
        name: "Test Brand",
        image: "test.jpg",
      });

      return newBrand;                        
    }