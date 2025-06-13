import { Model, QueryInterface } from "sequelize";
import { DataTypesTest, queryInterface, sequelizeInstance } from "../setup";
import migration from "../../database/migrations/20250607110406-subcategory";
import { getCategoryMock } from "./category.mock";

export interface ISubCategory extends Model {
  id: number;
  name: string;
  image: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export const getSubCategoryMock = async () => {
  await migration.up(queryInterface as QueryInterface, DataTypesTest);

  const newCategory = await getCategoryMock();


  const SubCategories = sequelizeInstance.define<ISubCategory>(
    "SubCategory",
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
      categoryId: {
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

  const newSubCategory = await SubCategories.create({
    name: "Test SubCategory",
    image: "test.jpg",
    categoryId : newCategory.id,
  });

  return newSubCategory;

};
