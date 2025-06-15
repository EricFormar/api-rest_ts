import { QueryInterface } from "sequelize";
import { DataTypesTest, queryInterface } from "../setup";
import migration from "../../database/migrations/20250607142315-address";
import Address from "../../database/models/address";
import { AddressAttributes } from "../../database/models/address";

export const getAddressMock = async (data : Partial<AddressAttributes>
): Promise<Address> => {
  await migration.up(queryInterface as QueryInterface, DataTypesTest);

  const {id, location, city, province, country, postalCode, userId} = data ;

  const newAddress = await Address.create({
    id : id || 1,
    location: location || "any location",
    city: city || "any city",
    province: province || "any province",
    country: country || "any country",
    postalCode: postalCode || "any postal code",
    userId: userId || 1,
    createdAt : new Date,
    updatedAt : new Date,
  });
  return newAddress;
};
