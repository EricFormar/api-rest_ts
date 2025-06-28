import { IBrand } from "../../interfaces/IBrand";

export const getBrandMock =  (data : Partial<IBrand>) : IBrand => {
  
  const {id = 1, name, image} = data;
      const newBrand = {
        id,
        name : name || "any name",
        image : image || "any image",
        createdAt : new Date,
        updatedAt : new Date
      };

      return newBrand;                        
    }