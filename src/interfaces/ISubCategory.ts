export interface ISubCategory{

    id: number;
    name: string;
    image: string | null;
    categoryId: number;
  
    updatedAt?: Date;
    deletedAt?: Date;
    createdAt?: Date;
  }