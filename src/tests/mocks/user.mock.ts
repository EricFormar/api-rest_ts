import { IUser } from "../../interfaces/IUser";

export const getUserMock = (data : Partial<IUser>) : IUser => {

  const {id, name, surname, email, password, image, locked, validated, rolId = 1} = data;
  const newUser = {
    id: id || 1,
    name: name || "any name",
    surname: surname || "any surnname",
    email: email || "any@email.com",
    password: password || "any password",
    image: image || "any image",
    locked: locked || false,
    validated: validated || false,
    rolId,
    createdAt : new Date,
    updatedAt : new Date,
  };

  return newUser;
};
