import { Model, QueryInterface } from "sequelize";
import { DataTypesTest, queryInterface, sequelizeInstance } from "../setup";
import migration from "../../database/migrations/20250607110120-section";
import Section, { SectionAttributes } from "../../database/models/section";
import { getRandomNumber } from "../../utils/getRandomNumber";

export interface ISection extends Model {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export const getSectionMock = async (data : Partial<SectionAttributes>) : Promise<Section> => {

  const {id, name} = data;
  const newSection = await Section.create({
    id : id || getRandomNumber(1,100),
    name : name || "any name",
    createdAt : new Date,
    updatedAt : new Date,
  });
  return newSection;
};
