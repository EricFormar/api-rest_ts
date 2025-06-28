import { ISection } from "./ISection";

export interface ISectionRespository {
    getAll(): Promise<ISection[]>;
    getById(id: number): Promise<ISection | null>;
    create(brand: Omit<ISection, 'id' | 'createdAt' | 'updatedAt'>): Promise<ISection>;
    update(brand: Omit<ISection, 'createdAt' | 'updatedAt'>): Promise<ISection | null>;
    delete(id: number): Promise<boolean>;
}