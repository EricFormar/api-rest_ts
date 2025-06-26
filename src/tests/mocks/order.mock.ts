import { IOrder } from "../../interfaces/IOrder";

export const getOrderMock = (data : Partial<IOrder>): IOrder => {
  
  const {id = 1, total, statusId = 1, userId = 1} = data;

  const newOrder = {
    id,
    total: total || 1,
    statusId,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return newOrder;
};
