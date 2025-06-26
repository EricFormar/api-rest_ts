import { ICategory } from "../../interfaces/ICategory";
import { ICategoryRepository } from "../../interfaces/ICategoryRepository";
import { getRandomNumber } from "../../utils/getRandomNumber";

// Esto simularía una base de datos en memoria

export class CategoryTestingRepository implements ICategoryRepository {
  constructor(private categories: ICategory[] = []) {
    this.categories = categories;
  }
  async findAll(): Promise<ICategory[]> {
    return [...this.categories]; // Retorna una copia para evitar mutaciones externas
  }
  async findById(id: number): Promise<ICategory | null> {
    return this.categories.find((product) => product.id === id) || null;
  }
  async create(
    product: Omit<ICategory, "id" | "createdAt" | "updatedAt">
  ): Promise<ICategory> {
    const newProduct: ICategory = {
      id: getRandomNumber(1, 1),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...product,
    };
    this.categories.push(newProduct);
    return newProduct;
  }
  async update(dataToUpdate: Partial<ICategory>): Promise<ICategory | null> {
    const index = this.categories.findIndex((p) => p.id === dataToUpdate.id);

    this.categories[index] = {
      ...this.categories[index],
      ...dataToUpdate,
      updatedAt: new Date(),
    };

    return this.categories[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.categories.findIndex((product) => product.id === id);
      this.categories.splice(index, 1);
      return true;
  }
}
