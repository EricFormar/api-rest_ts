import { beforeEach, describe, expect, it } from "vitest";
import { CategoryService } from "../../services/category.service";
import { getCategoryMock } from "../mocks/category.mock";
import { BadRequestError, NotFoundError } from "../../errors/HttpError";
import { CategoryTestingRepository } from "../repositories/CategoryTestingrRepository";

const categories = [
  getCategoryMock({
    id: 1,
    name: "any category",
  }),
  getCategoryMock({
    id: 2,
    name: "other category",
  }),
];

let categoryService: CategoryService;
let mockCategoryRepository: CategoryTestingRepository;

beforeEach(async () => {
  mockCategoryRepository = new CategoryTestingRepository(categories);
  categoryService = new CategoryService(mockCategoryRepository);
});

describe("CategoryService.getAllCategories", () => {
  // Test getAllCategories
  it("should get all categories", async () => {
    const result = await categoryService.getAll();
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result).toEqual(categories);
  });

  it("should return an empty array if no categories are found", async () => {
    categoryService = new CategoryService(new CategoryTestingRepository([]));
    const result = await categoryService.getAll();

    expect(result).toEqual([]);
  });
});
// Test getCategoryById
describe("BrandService.getCategoryById", () => {
  it("should get category by id", async () => {
    const result = await categoryService.getById(1);
    expect(result).toBeDefined();
    expect(result).toEqual(categories[0]);
  });

  // Test getCategoryById with non-existing category
  it("should throw error when category id does not exist", async () => {
    await expect(categoryService.getById(3)).rejects.toThrow(NotFoundError);
  });

  // Test getCategoryById widthout id
  it("should throw error when category id is missing", async () => {
    await expect(categoryService.getById(null as any)).rejects.toThrow(
      BadRequestError
    );
  });

  // Test getCategoryById with invalid id
  it("should throw error when category id is invalid", async () => {
    await expect(categoryService.getById("A" as any)).rejects.toThrow(
      BadRequestError
    );
  });
});

// Test createCategory
describe("CategoryService.create", () => {
  it("should create a category", async () => {
    const data = getCategoryMock({
      name: "new category",
      image: "any-image.jpg",
    });
    const newCateogry = await categoryService.create(data);
    expect(newCateogry).toBeDefined();
    expect(newCateogry).toEqual(data);
  });

  // Test createCategory with invalid data
  it("should throw error when invalid data", async () => {
    await expect(
      categoryService.create({
        name: "",
        image: "",
      })
    ).rejects.toThrow(BadRequestError);
  });
});
// Test updateCategory
describe("CategoryService.updateCategory", () => {
  it("should update a category", async () => {
    const categoryToUpdate = getCategoryMock({
      id: 1,
      name: "update category",
    });
    const categoryUpdated = await categoryService.update(categoryToUpdate);
    expect(categoryUpdated).toBeDefined();
    expect(categoryUpdated?.name).toBe("update category");
  });

  // Test updateCategory with non-existing category
  it("should throw error when category id does not exist", async () => {
    const categoryToUpdate = getCategoryMock({
      id: 1000,
      name: "update brand",
    });
    await expect(categoryService.update(categoryToUpdate)).rejects.toThrow(
      NotFoundError
    );
  });

  // Test updateCategory with empty payload
  it("should throw error when category payload is empty", async () => {
    await expect(categoryService.update(null as any)).rejects.toThrow(
      BadRequestError
    );
  });
});

// Test deleteCategory
describe("CategoryService.deleteCategory", () => {

  it("should delete a category", async () => {
    const result = await categoryService.delete(1);
    expect(result).toBe(true);
  });

  // Test deleteCategory with non-existing category
  it("should throw error when category id does not exist", async () => {
    await expect(categoryService.delete(3)).rejects.toThrow(
      NotFoundError
    );
  });

  // Test deleteCategory with invalid id
  it("should throw error when category id is invalid", async () => {
    await expect(categoryService.delete("a" as any)).rejects.toThrow(
      BadRequestError
    );
  });
});
