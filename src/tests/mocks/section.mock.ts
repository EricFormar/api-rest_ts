import { ISection } from "../../interfaces/ISection";

export const getSectionMock =  (data : Partial<ISection>) : ISection => {

  const {id = 1, name} = data;
  const newSection = {
    id,
    name : name || "any name",
    createdAt : new Date,
    updatedAt : new Date,
  };
  return newSection;
};
