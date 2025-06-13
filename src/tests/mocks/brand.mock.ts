import { QueryInterface } from "sequelize";
import { DataTypesTest, queryInterface } from "../setup";
import migration from "../../database/migrations/20250607110250-brand";
import Brand  from "../../database/models/brand";

export const getBrandMock = async () => {

    await migration.up(queryInterface as QueryInterface, DataTypesTest);
  
      const newBrand = await Brand.create({
        id: 1,
        name: "Test Brand",
        image: "test.jpg",
        createdAt : new Date,
        updatedAt : new Date
      });

      return newBrand;                        
    }