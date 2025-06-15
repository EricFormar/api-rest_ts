import Order, { OrderAttributes } from "../../database/models/order";
import { getRandomNumber } from "../../utils/getRandomNumber";


export const getOrderMock = async (data : Partial<OrderAttributes>): Promise<Order> => {
  
  const {id, total, statusId, userId} = data;

  const newOrder = await Order.create({
    id : id || getRandomNumber(1,100),
    total: total || 1,
    statusId: statusId || getRandomNumber(1,10),
    userId: userId || getRandomNumber(1,100),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return newOrder;
};
