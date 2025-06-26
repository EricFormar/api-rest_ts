export interface IImage  {
 
    id: number;
    file: string;
    productId: number;
  
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}