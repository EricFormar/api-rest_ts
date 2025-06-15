import Product, { ProductAttributes } from "../../database/models/product";
import { getRandomNumber } from "../../utils/getRandomNumber";

export const getProductMock = async (data : Partial<ProductAttributes>) : Promise<Product> => {

  const {id,name, description, price, discount, subcategoryId, sectionId, brandId, categoryId} = data;

  const newProduct = await Product.create({
    id : id || getRandomNumber(1,1000),
    name : name || "any name",
    description : description || "any description",
    price : price || 100,
    discount : discount || 0,
    subcategoryId : subcategoryId || 1,
    sectionId : sectionId || 1,
    brandId : brandId || 1,
    categoryId : categoryId || 1,
  });

  return newProduct;
};
