import { QueryInterface } from "sequelize";
import { DataTypesTest, queryInterface } from "../../database/setup";
import migration from "../../database/migrations/20250607142315-address";
import Address from "../../database/models/address";
import { AddressAttributes } from "../../database/models/address";

export const getAddressMock = async (data : Partial<AddressAttributes>
): Promise<Address> => {
  await migration.up(queryInterface as QueryInterface, DataTypesTest);

  const {
    id = 1, 
    location = "any location", 
    city = "any city", 
    province = "any province", 
    country = "any country", 
    postalCode  = "any postal code", 
    userId = 1} = data ;

  const newAddress = await Address.create({
    id,
    location,
    city,
    province,
    country,
    postalCode,
    userId,
    createdAt : new Date,
    updatedAt : new Date,
  });
  return newAddress;
};
