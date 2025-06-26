export interface IOrder{

    id: number;
    total: number;
    statusId: number;
    userId: number;
    
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }