import { QueryInterface } from "sequelize";
import { DataTypesTest, queryInterface } from "../setup";
import migration from "../../database/migrations/20250607105742-category";
import Category from "../../database/models/category";

// Define una función que cree una categoría de prueba en la base de datos
export const getCategoryMock = async () => {
  await migration.up(queryInterface as QueryInterface, DataTypesTest);

  const newCategory = await Category.create({
    id: 1,
    name: "Test Category",
    image: "test.jpg",
  });

  return newCategory;
};
