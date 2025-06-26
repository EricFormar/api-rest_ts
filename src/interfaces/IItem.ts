export interface IItem{

    id: number;
    quantity: number;
    productId: number;
    orderId: number;
  
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }