import Brand, { BrandAttributes }  from "../../database/models/brand";

export const getBrandMock = async (data : Partial<BrandAttributes>) => {
  
  const {id, name, image} = data;
      const newBrand = await Brand.create({
        id : id || 1,
        name : name || "any name",
        image : image || "any image",
        createdAt : new Date,
        updatedAt : new Date
      });

      return newBrand;                        
    }