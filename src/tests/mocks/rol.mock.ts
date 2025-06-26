import { IRol } from "../../interfaces/IRol";

export const getRolMock =  (data : Partial<IRol>) : IRol => {

  const {id = 1, name} = data;
  const newRol = {
    id,
    name: name || "any rol",
    createdAt : new Date,
    updatedAt : new Date,
  };

  return newRol;
};
