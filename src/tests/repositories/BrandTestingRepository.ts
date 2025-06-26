import { IBrand } from "../../interfaces/IBrand";
import { IBrandRespository } from "../../interfaces/IBrandRepository";
import { getRandomNumber } from "../../utils/getRandomNumber";

// Esto simularía una base de datos en memoria

export class BrandTestingRepository implements IBrandRespository {
  constructor(private brands: IBrand[] = []) {
    this.brands = brands;
  }
  async findAll(): Promise<IBrand[]> {
    return [...this.brands]; // Retorna una copia para evitar mutaciones externas
  }
  async findById(id: number): Promise<IBrand | null> {
    return this.brands.find((product) => product.id === id) || null;
  }
  async create(
    product: Omit<IBrand, "id" | "createdAt" | "updatedAt">
  ): Promise<IBrand> {
    const newProduct: IBrand = {
      id: getRandomNumber(1, 1),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...product,
    };
    this.brands.push(newProduct);
    return newProduct;
  }
  async update(dataToUpdate: Partial<IBrand>): Promise<IBrand | null> {
    const index = this.brands.findIndex((p) => p.id === dataToUpdate.id);

    this.brands[index] = {
      ...this.brands[index],
      ...dataToUpdate,
      updatedAt: new Date(),
    };

    return this.brands[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.brands.findIndex((product) => product.id === id);
    this.brands.splice(index, 1);
    return true;
  }
}
