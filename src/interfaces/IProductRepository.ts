import { IProduct } from "./IProduct";

export interface IProductRepository {
    findAll(): Promise<IProduct[]>;
    findById(id: number): Promise<IProduct | null>;
    create(product: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<IProduct>;
    update(product: Omit<IProduct, 'createdAt' | 'updatedAt'>): Promise<IProduct | null>;
    delete(id: number): Promise<boolean>;
    search(data: Partial<IProduct>): Promise<IProduct[]>;
    count(): Promise<number>;
    findByCategoryId(categoryId: number): Promise<IProduct[]>;
}