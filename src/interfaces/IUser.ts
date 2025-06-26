export interface IUser {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    image?: string;
    token?: string;
    locked: boolean;
    validated: boolean;
    rolId: number;
  
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }