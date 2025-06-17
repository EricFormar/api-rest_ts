import Item, { ItemAttributes } from "../../database/models/item";

export const getItemMock = async (data : Partial<ItemAttributes>): Promise<Item> => {

  const {id = 1, quantity = 1, productId = 1, orderId = 1} = data;

  const newItem = await Item.create({
    id,
    quantity,
    productId,
    orderId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return newItem;
};
