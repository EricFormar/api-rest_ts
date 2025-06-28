import { ISubCategory } from "./ISubcategory";

export interface ISubCategoryRepository {
    getAll(): Promise<ISubCategory[]>;
    getById(id: number): Promise<ISubCategory | null>;
    create(brand: Omit<ISubCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<ISubCategory>;
    update(brand: Omit<ISubCategory, 'createdAt' | 'updatedAt'>): Promise<ISubCategory | null>;
    delete(id: number): Promise<boolean>;
}