import { Model, QueryInterface } from "sequelize";
import { DataTypesTest, queryInterface, sequelizeInstance } from "../setup";
import migration from "../../database/migrations/20250607105742-category";

// Define una interfaz para el modelo de Categoría para facilitar la verificación
export interface ICategory extends Model {
  id: number;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
// Define una función que cree una categoría de prueba en la base de datos
export const getCategoryMock = async () => {

    await migration.up(queryInterface as QueryInterface, DataTypesTest);
    
    // Opcional: Intenta insertar un registro para verificar la integridad
    const Categories = sequelizeInstance.define<ICategory>(
      "Category",
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
    ); // Incluye timestamps y paranoid si los usas en tu modelo real

    const newCategory = await Categories.create({
      name: "Test Category",
      image: "test.jpg",
    });


      return newCategory;                        
    }