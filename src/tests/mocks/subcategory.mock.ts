import SubCategory, { SubCategoryAttributes } from "../../database/models/subcategory";
import { getRandomNumber } from "../../utils/getRandomNumber";

export const getSubCategoryMock = async (data : Partial<SubCategoryAttributes>) : Promise<SubCategory> => {

  const {id, name, image, categoryId} = data;

  const newSubCategory = await SubCategory.create({
    id : id || getRandomNumber(1,1000),
    name : name || "any category",
    image : image || "any image",
    categoryId : categoryId || getRandomNumber(1,1000),
  });

  return newSubCategory;

};
