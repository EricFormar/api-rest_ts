export interface IAddress {

    id: number;
    location: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    userId: number;
  
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }