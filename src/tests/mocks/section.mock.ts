import { Model, QueryInterface } from "sequelize";
import Section, { SectionAttributes } from "../../database/models/section";

export interface ISection extends Model {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export const getSectionMock = async (data : Partial<SectionAttributes>) : Promise<Section> => {

  const {id = 1, name} = data;
  const newSection = await Section.create({
    id,
    name : name || "any name",
    createdAt : new Date,
    updatedAt : new Date,
  });
  return newSection;
};
