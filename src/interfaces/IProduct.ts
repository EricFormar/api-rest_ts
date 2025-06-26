export interface IProduct{

    id: number;
    name: string;
    price: number;
    discount : number;
    description : string;
    brandId : number;
    categoryId : number;
    subcategoryId : number;
    sectionId: number;
  
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    
  }