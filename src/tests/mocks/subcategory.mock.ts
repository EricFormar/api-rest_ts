import { ISubCategory } from "../../interfaces/ISubcategory";

export const getSubCategoryMock =  (data : Partial<ISubCategory>) : ISubCategory => {

  const {id = 1, name, image, categoryId = 1} = data; 

  const newSubCategory = {
    id,
    name : name || "any category",
    image : image || "any image",
    categoryId,
  };

  return newSubCategory;

};
