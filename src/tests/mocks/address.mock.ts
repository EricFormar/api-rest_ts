import { IAddress } from "../../interfaces/IAddress";

export const getAddressMock =  (data : Partial<IAddress>
): IAddress => {

  const {
    id = 1, 
    location = "any location", 
    city = "any city", 
    province = "any province", 
    country = "any country", 
    postalCode  = "any postal code", 
    userId = 1} = data ;

  const newAddress = {
    id,
    location,
    city,
    province,
    country,
    postalCode,
    userId,
    createdAt : new Date,
    updatedAt : new Date,
  };
  return newAddress;
};
