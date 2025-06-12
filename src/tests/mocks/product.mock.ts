import { Model, QueryInterface } from "sequelize";
import { DataTypesTest, queryInterface, sequelizeInstance } from "../setup";
import migration from "../../database/migrations/20250607110618-product";
import { getSectionMock } from "./section.mock";
import { getCategoryMock } from "./category.mock";
import { getSubCategoryMock } from "./subcategory.mock";
import { getBrandMock } from "./brand.mock";

export interface IProduct extends Model {
  id: number;
  name: string;
  price: number;
  discount: number;
  description: string;
  brandId: number;
  categoryId: number;
  subcategoryId: number;
  sectionId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
export const getProductMock = async () => {

  await migration.up(queryInterface as QueryInterface, DataTypesTest);
  
  const newSection = await getSectionMock();
  const newCategory = await getCategoryMock();
  const newSubCategory = await getSubCategoryMock();
  const newBrand = await getBrandMock();

  const Products = sequelizeInstance.define<IProduct>(
    "Product",
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
      description: {
        type: DataTypesTest.STRING,
      },
      price: {
        type: DataTypesTest.INTEGER,
      },
      discount: {
        type: DataTypesTest.INTEGER,
      },
      subcategoryId: {
        type: DataTypesTest.INTEGER,
      },
      sectionId: {
        type: DataTypesTest.INTEGER,
      },
      brandId: {
        type: DataTypesTest.INTEGER,
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

  const newProduct = await Products.create({
    name: "Test Product",
    description: "Test Description",
    price: 100,
    discount: 10,
    subcategoryId: newSubCategory.id,
    sectionId: newSection.id,
    brandId: newBrand.id,
    categoryId: newCategory.id,
  });

  return newProduct;
};
