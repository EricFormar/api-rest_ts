import { ISubCategory } from "../../interfaces/ISubcategory";
import { ISubCategoryRepository } from "../../interfaces/ISubCategoryRepository";
import { getRandomNumber } from "../../utils/getRandomNumber";

// Esto simularía una base de datos en memoria

export class SubCategoryTestingRepository implements ISubCategoryRepository {
  constructor(private subCategories: ISubCategory[] = []) {
    this.subCategories = subCategories;
  }
  async getAll(): Promise<ISubCategory[]> {
    return [...this.subCategories]; // Retorna una copia para evitar mutaciones externas
  }
  async getById(id: number): Promise<ISubCategory | null> {
    return this.subCategories.find((subcategory) => subcategory.id === id) || null;
  }
  async create(
    data: Omit<ISubCategory, "id" | "createdAt" | "updatedAt">
  ): Promise<ISubCategory> {
    const newSubCategory: ISubCategory = {
      id: getRandomNumber(1, 1),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    this.subCategories.push(newSubCategory);
    return newSubCategory;
  }
  async update(dataToUpdate: Partial<ISubCategory>): Promise<ISubCategory | null> {
    const index = this.subCategories.findIndex((p) => p.id === dataToUpdate.id);

    this.subCategories[index] = {
      ...this.subCategories[index],
      ...dataToUpdate,
      updatedAt: new Date(),
    };

    return this.subCategories[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.subCategories.findIndex((product) => product.id === id);
      this.subCategories.splice(index, 1);
      return true;
  }
}
