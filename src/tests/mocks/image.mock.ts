import { IImage } from "../../interfaces/IImage";

export const getImageMock = (data : Partial<IImage>) : IImage => {
  
  const {id = 1, file = "any file", productId = 1} = data
  const image : IImage = {
    id,
    file,
    productId,
    createdAt : new Date,
    updatedAt : new Date,
  };

  return image;

}