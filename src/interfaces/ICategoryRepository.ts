import { ICategory } from "./ICategory";

export interface ICategoryRepository {
    findAll(): Promise<ICategory[]>;
    findById(id: number): Promise<ICategory | null>;
    create(brand: Omit<ICategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<ICategory>;
    update(brand: Omit<ICategory, 'createdAt' | 'updatedAt'>): Promise<ICategory | null>;
    delete(id: number): Promise<boolean>;
    search(data: Partial<ICategory>): Promise<ICategory[]>;
}