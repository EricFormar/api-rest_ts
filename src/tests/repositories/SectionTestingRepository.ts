import { ISection } from "../../interfaces/ISection";
import { ISectionRespository } from "../../interfaces/ISectionRepository";
import { getRandomNumber } from "../../utils/getRandomNumber";

// Esto simularía una base de datos en memoria

export class SectionTestingRepository implements ISectionRespository {
  constructor(private sections: ISection[] = []) {
    this.sections = sections;
  }
  async getAll(): Promise<ISection[]> {
    return [...this.sections]; // Retorna una copia para evitar mutaciones externas
  }
  async getById(id: number): Promise<ISection | null> {
    return this.sections.find((product) => product.id === id) || null;
  }
  async create(
    product: Omit<ISection, "id" | "createdAt" | "updatedAt">
  ): Promise<ISection> {
    const newProduct: ISection = {
      id: getRandomNumber(1, 1),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...product,
    };
    this.sections.push(newProduct);
    return newProduct;
  }
  async update(dataToUpdate: Partial<ISection>): Promise<ISection | null> {
    const index = this.sections.findIndex((p) => p.id === dataToUpdate.id);

    this.sections[index] = {
      ...this.sections[index],
      ...dataToUpdate,
      updatedAt: new Date(),
    };

    return this.sections[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.sections.findIndex((product) => product.id === id);
    this.sections.splice(index, 1);
    return true;
  }
}
