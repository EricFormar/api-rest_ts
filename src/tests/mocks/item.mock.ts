import { IItem } from "../../interfaces/IItem";

export const getItemMock = (data: Partial<IItem>): IItem => {
  const { id = 1, quantity = 1, productId = 1, orderId = 1 } = data;

  const newItem = {
    id,
    quantity,
    productId,
    orderId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return newItem;
};
