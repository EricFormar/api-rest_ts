import Brand from "../database/models/brand";
import { BadRequestError, NotFoundError } from "../errors/HttpError";
import { IBrand } from "../interfaces/IBrand";
import { BrandTestingRepository } from "../tests/repositories/BrandTestingRepository";

export type BrandModelRequest = Pick<Brand, "name" | "image">;

export class BrandService {
  constructor(private brandRespository: BrandTestingRepository) {}
  // Get all brands
  async getAll() {
    return await this.brandRespository.findAll();
  }
  // Get brand by id
  async getById(id: number) {
      if(typeof id !== 'number') throw new BadRequestError();
      const brand =  await this.brandRespository.findById(id);
      if(!brand) throw new NotFoundError("Brand not found");
      return brand
  }
  // Create brand
  async create(brand: Omit<IBrand, "id" | "createdAt" | "updatedAt">) {
    if (
      !brand.name ||
      !brand.image ||
      brand.name === "" ||
      brand.image === ""
    ) {
      throw new BadRequestError("Bad Request");
    }

    return await this.brandRespository.create(brand);
  }
  // Update brand
  async update(brand: Omit<Partial<IBrand>, "createdAt" | "updatedAt">) {
    const brandToUpdate = await this.brandRespository.findById(brand.id as number);
    if (!brandToUpdate) {
      throw new NotFoundError("Brand not found");
    }
    return this.brandRespository.update(brand);
  }
  // Delete brand
  async delete(id: number) {
    const brand = await this.brandRespository.findById(id);
    if (!brand) {
      throw new NotFoundError("Brand not found");
    }
    return this.brandRespository.delete(id);
  }
}
