import Category, { CategoryAttributes } from "../../database/models/category";

// Define una función que cree una categoría de prueba en la base de datos
export const getCategoryMock = async (data : Partial<CategoryAttributes>) : Promise<Category> => {

  const {id, name, image} = data;
  const newCategory = await Category.create({
    id : id || 1,
    name : name || "any name",
    image : image || "any image",
    createdAt : new Date,
    updatedAt : new Date,
  });

  return newCategory;
};
