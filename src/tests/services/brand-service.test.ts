import { describe, expect, it, beforeEach} from "vitest";
import { BrandService } from "../../services/brand.service";
import { getBrandMock } from "../mocks/brand.mock";
import { BadRequestError, NotFoundError } from "../../errors/HttpError";
import { BrandTestingRepository } from "../repositories/BrandTestingRepository";

const brands = [
  getBrandMock({
    id: 1,
    name: "any brand",
  }),
  getBrandMock({
    id: 2,
    name: "other brand",
  }),
];

let brandService: BrandService;
let mockBrandRepository: BrandTestingRepository;

beforeEach(async () => {
  mockBrandRepository = new BrandTestingRepository(brands);
  brandService = new BrandService(mockBrandRepository);
});

describe("BrandService.getAll", () => {
  it("should return all brands", async () => {
    const result = await brandService.getAll();

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result).toEqual(brands);
  });

  it("should return an empty array if no brands are found", async () => {
    brandService = new BrandService(new BrandTestingRepository([]));
    const result = await brandService.getAll();

    expect(result).toEqual([]);
  });
});

describe("BrandService.getById", () => {
  // Obtener brand por id
  it("should return a product by id", async () => {
    const result = await brandService.getById(1);

    expect(result).toBeDefined();
    expect(result).toEqual(brands[0]);
  });

  // Checar errores al obtener brand por id
  it("should return null if brand not found", async () => {
    await expect(brandService.getById(3)).rejects.toThrow(NotFoundError);
  });

  describe("BrandService.create", () => {
    it("should create a brand", async () => {
      const data = getBrandMock({
        name: "new brand",
        image: "any-image.jpg",
      });
      const newBrand = await brandService.create(data);

      expect(newBrand).toBeDefined();
      expect(newBrand).toEqual(data);
    });
  });
  // Checar errores al crear brand
  it("should throw an error if brand data is missing", async () => {
    await expect(
      brandService.create({
        name: "",
        image: "",
      })
    ).rejects.toThrow(BadRequestError);
  });
});

// Actualizar brand
describe("BrandService.update", () => {
  it("should update a brand", async () => {
    const brandToUpdate = getBrandMock({
      id: 1,
      name: "update brand",
    });
    const brandUpdated = await brandService.update(brandToUpdate);

    expect(brandUpdated).toBeDefined();
    expect(brandUpdated).toEqual(brandToUpdate);
  });

  it("should return reject if product to update not found", async () => {
    const brandToUpdate = getBrandMock({
      id: 1000,
      name: "update brand",
    });

    await expect (brandService.update(brandToUpdate)).rejects.toThrow(NotFoundError)

  });
});

// Eliminar brand
describe("BrandService.delete", () => {
  it("should delete a brand", async () => {
    const result = await brandService.delete(1);

    expect(result).toBe(true);
  });

  it("should return null if product to delete not found", async () => {
    await expect(brandService.delete(3)).rejects.toThrow(NotFoundError)
  });

  
});
