import { IProduct } from "../../interfaces/IProduct";

export const getProductMock = (data : Partial<IProduct>) : IProduct => {

  const {id, name, description, price, discount, subcategoryId, sectionId, brandId, categoryId} = data;

  const product : IProduct = {
    id: id || 1,
    name : name || "any name",
    description : description || "any description",
    price : price || 100,
    discount : discount || 0,
    subcategoryId: subcategoryId || 1,
    sectionId: sectionId || 1,
    brandId: brandId || 1,
    categoryId: categoryId || 1,
    createdAt : new Date,
    updatedAt : new Date,
  };

  return product;
};
