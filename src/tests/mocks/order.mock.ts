import Order, { OrderAttributes } from "../../database/models/order";

export const getOrderMock = async (data : Partial<OrderAttributes>): Promise<Order> => {
  
  const {id = 1, total, statusId = 1, userId = 1} = data;

  const newOrder = await Order.create({
    id,
    total: total || 1,
    statusId,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return newOrder;
};
