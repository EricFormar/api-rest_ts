import SubCategory, { SubCategoryAttributes } from "../../database/models/subcategory";

export const getSubCategoryMock = async (data : Partial<SubCategoryAttributes>) : Promise<SubCategory> => {

  const {id = 1, name, image, categoryId = 1} = data;
  console.log({categoryId});
  

  const newSubCategory = await SubCategory.create({
    id,
    name : name || "any category",
    image : image || "any image",
    categoryId,
  });

  return newSubCategory;

};
