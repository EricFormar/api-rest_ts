import { BadRequestError, NotFoundError } from "../errors/HttpError";
import { ICategory } from "../interfaces/ICategory";
import { CategoryTestingRepository } from "../tests/repositories/CategoryTestingrRepository";
import { getRandomNumber } from "../utils/getRandomNumber";

export class CategoryService {
  constructor(private categoryRepository: CategoryTestingRepository) {}

  // Get all categories
  async getAll() {
    return this.categoryRepository.findAll();
  }

  // Get category by id
  async getById(id: number) {
    if (typeof id !== "number") throw new BadRequestError();
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundError();
    return category;
  }

  // Create category
  async create(
    category: Omit<ICategory, "id" | "createdAt" | "updatedAt">
  ) {
    if (
      !category.name ||
      !category.image ||
      category.name === "" ||
      category.image === ""
    ) {
      throw new BadRequestError("Bad Request");
    }

    return await this.categoryRepository.create(category);
  }
  // Update category
  async update(
    category: Omit<Partial<ICategory>, "createdAt" | "updatedAt">
  ) {
   if(!category) throw new BadRequestError();

    const categoryToUpdate = await this.categoryRepository.findById(
      category.id as number
    );
    if (!categoryToUpdate) {
      throw new NotFoundError("category not found");
    }
    return this.categoryRepository.update(category);
  }
  // Delete category
  async delete(id: number) {
   if(typeof id != "number") throw new BadRequestError();
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundError("category not found");
    }
    return this.categoryRepository.delete(id);
  }
}
