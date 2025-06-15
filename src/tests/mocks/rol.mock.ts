import Rol, { RolAttributes } from "../../database/models/rol";

export const getRolMock = async (data : Partial<RolAttributes>) : Promise<Rol> => {

  const {id, name} = data;
  const newRol = await Rol.create({
    id : id || 1,
    name: name || "any rol",
    createdAt : new Date,
    updatedAt : new Date,
  });

  return newRol;
};
