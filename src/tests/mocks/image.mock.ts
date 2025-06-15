import Image, { ImageAttributes } from "../../database/models/image";

export const getImageMock = async (data : Partial<ImageAttributes>) : Promise<Image> => {

  const {id, file, productId} = data
  const newImage = await Image.create({
    id : id || 1,
    file : file || "any file",
    productId : productId || 1,
    createdAt : new Date,
    updatedAt : new Date,
  });
  return newImage;
};
