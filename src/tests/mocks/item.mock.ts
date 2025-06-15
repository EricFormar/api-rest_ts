import Item, { ItemAttributes } from "../../database/models/item";
import { getRandomNumber } from "../../utils/getRandomNumber";

export const getItemMock = async (data : Partial<ItemAttributes>): Promise<Item> => {

  const {id, quantity, productId, orderId} = data;

  const newItem = await Item.create({
    id : id || getRandomNumber(1,100),
    quantity: quantity || 1,
    productId: productId || getRandomNumber(1,1000),
    orderId: orderId || getRandomNumber(1,100),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return newItem;
};
