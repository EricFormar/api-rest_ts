import { IBrand } from "../interfaces/IBrand";

export interface IBrandRespository {
    findAll(): Promise<IBrand[]>;
    findById(id: number): Promise<IBrand | null>;
    create(brand: Omit<IBrand, 'id' | 'createdAt' | 'updatedAt'>): Promise<IBrand>;
    update(brand: Omit<IBrand, 'createdAt' | 'updatedAt'>): Promise<IBrand | null>;
    delete(id: number): Promise<boolean>;
    search(data: Partial<IBrand>): Promise<IBrand[]>;
}