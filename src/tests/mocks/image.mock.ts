import Image, { ImageAttributes } from "../../database/models/image";

export const getImageMock = async (data : Partial<ImageAttributes>) : Promise<Image> => {

  const {id = 1, file = "any file", productId = 1} = data
  const newImage = await Image.create({
    id,
    file,
    productId,
    createdAt : new Date,
    updatedAt : new Date,
  });
  return newImage;
};
