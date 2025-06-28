import Section from "../database/models/section";
import { BadRequestError, NotFoundError } from "../errors/HttpError";
import { ISection } from "../interfaces/ISection";
import { SectionTestingRepository } from "../tests/repositories/SectionTestingRepository";

export class SectionService {
  constructor(private sectionRepository: SectionTestingRepository) {}

  // Get all sections
  async getAll() {
    return await this.sectionRepository.getAll();
  }
  // Get section by id
  async getById(id: number) {
    if (typeof id !== "number") throw new BadRequestError();
    const section = await this.sectionRepository.getById(id);
    if (!section) throw new NotFoundError();
    return section;
  }

  // Create section
  async create(data: Omit<ISection, "id" | "createdAt" | "updatedAt">) {
    if (!data.name || data.name == "") throw new BadRequestError();
    const newSection = await this.sectionRepository.create(data);
    return newSection;
  }

  // Update section
  async update(data: Omit<Partial<ISection>, "createdAt" | "updatedAt">) {
    const section = await this.getById(data.id as number);
    if (!section) throw new NotFoundError();
    const sectionUpdated = await this.sectionRepository.update(data);
    return sectionUpdated;
  }
  // Delete section
  async delete(id: number) {
    const section = await this.getById(id);
    if (!section) throw new NotFoundError();
    return this.sectionRepository.delete(id);
  }
}
