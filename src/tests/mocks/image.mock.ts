import { Model, QueryInterface } from "sequelize";
import { DataTypesTest, queryInterface, sequelizeInstance } from "../setup";
import migration from "../../database/migrations/20250607111049-image";
import { getProductMock } from "./product.mock";

export interface IImage extends Model {
  id: number;
  file: string;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export const getImageMock = async () => {
  await migration.up(queryInterface as QueryInterface, DataTypesTest);

  const newProduct = await getProductMock();

  const Images = sequelizeInstance.define<IImage>(
    "Images",
    {
      id: {
        type: DataTypesTest.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      file: {
        type: DataTypesTest.STRING,
      },
      productId: {
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
  const newImage = await Images.create({
    file: "test.jpg",
    productId: newProduct.id,
  });
  return newImage;
};
