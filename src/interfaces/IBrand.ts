export interface IBrand{

    id: number;
    name: string;
    image: string | null;
  
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    
  }