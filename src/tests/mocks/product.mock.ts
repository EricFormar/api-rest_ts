import Product, { ProductAttributes } from "../../database/models/product";

export const getProductMock = async (data : Partial<ProductAttributes>) : Promise<Product> => {

  const {id = 1,name, description, price, discount, subcategoryId = 1, sectionId = 1, brandId = 1, categoryId = 1} = data;

  const newProduct = await Product.create({
    id,
    name : name || "any name",
    description : description || "any description",
    price : price || 100,
    discount : discount || 0,
    subcategoryId,
    sectionId,
    brandId,
    categoryId,
  });

  return newProduct;
};
