import User, { UserAttributes } from "../../database/models/user";

export const getUserMock = async (data : Partial<UserAttributes>) : Promise<User> => {

  const {id, name, surname, email, password, image, locked, validated, rolId} = data;
  const newUser = await User.create({
    id: id || 1,
    name: name || "any name",
    surname: surname || "any surnname",
    email: email || "any@email.com",
    password: password || "any password",
    image: image || "any image",
    locked: locked || false,
    validated: validated || false,
    rolId: rolId || 1,
    createdAt : new Date,
    updatedAt : new Date,
  });

  return newUser;
};
