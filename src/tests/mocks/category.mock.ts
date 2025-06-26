import { ICategory } from "../../interfaces/ICategory";

// Define una función que cree una categoría de prueba en la base de datos
export const getCategoryMock =  (data : Partial<ICategory>) : ICategory => {

  const {id = 1, name, image} = data;
  const newCategory = {
    id,
    name : name || "any name",
    image : image || "any image",
    createdAt : new Date,
    updatedAt : new Date,
  };

  return newCategory;
};
