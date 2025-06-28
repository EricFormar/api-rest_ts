import { beforeEach, describe, expect, it } from "vitest";
import { BadRequestError, NotFoundError } from "../../errors/HttpError";
import { getSubCategoryMock } from "../mocks/subcategory.mock";
import { SubCategoryService } from "../../services/subcategory.service";
import { SubCategoryTestingRepository } from "../repositories/SubCategoryTestingrRepository";

const subcategories = [
  getSubCategoryMock({
    id: 1,
  }),
  getSubCategoryMock({
    id: 2,
    name: "other subcategory",
  }),
];

let subCategoryService: SubCategoryService;
let mockSubCategoryRepository: SubCategoryTestingRepository;

beforeEach(async () => {
  mockSubCategoryRepository = new SubCategoryTestingRepository(subcategories);
  subCategoryService = new SubCategoryService(mockSubCategoryRepository);
});

describe("SubCategoryService.getAllCategories", () => {
  // Test getAllCategories
  it("should get all subcategories", async () => {
    const result = await subCategoryService.getAll();
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result).toEqual(subcategories);
  });

  it("should return an empty array if no subcategories are found", async () => {
    subCategoryService = new SubCategoryService(new SubCategoryTestingRepository([]));
    const result = await subCategoryService.getAll();

    expect(result).toEqual([]);
  });
});
// Test getCategoryById
describe("BrandService.getCategoryById", () => {
  it("should get subcategory by id", async () => {
    const result = await subCategoryService.getById(1);
    expect(result).toBeDefined();
    expect(result).toEqual(subcategories[0]);
  });

  // Test getCategoryById with non-existing subcategory
  it("should throw error when subcategory id does not exist", async () => {
    await expect(subCategoryService.getById(3)).rejects.toThrow(NotFoundError);
  });

  // Test getCategoryById widthout id
  it("should throw error when subcategory id is missing", async () => {
    await expect(subCategoryService.getById(null as any)).rejects.toThrow(
      BadRequestError
    );
  });

  // Test getCategoryById with invalid id
  it("should throw error when subcategory id is invalid", async () => {
    await expect(subCategoryService.getById("A" as any)).rejects.toThrow(
      BadRequestError
    );
  });
});

// Test createCategory
describe("SubCategoryService.create", () => {
  it("should create a subcategory", async () => {
    const data = getSubCategoryMock({
      name: "new subcategory",
      image: "any-image.jpg",
    });
    const newSubCateogry = await subCategoryService.create(data);
    expect(newSubCateogry).toBeDefined();
    expect(newSubCateogry.name).toBe(data.name);
    expect(newSubCateogry.image).toBe(data.image);
  });

  // Test createCategory with invalid data
  it("should throw error when invalid data", async () => {
    await expect(
      subCategoryService.create({
        name: "",
        image: "",
        categoryId : 1
      })
    ).rejects.toThrow(BadRequestError);
  });
});
// Test updateCategory
describe("SubCategoryService.updateCategory", () => {
  it("should update a subcategory", async () => {
    const subCategoryToUpdate = getSubCategoryMock({
      id: 1,
      name: "update subcategory",
    });
    const categoryUpdated = await subCategoryService.update(subCategoryToUpdate);
    expect(categoryUpdated).toBeDefined();
    expect(categoryUpdated?.name).toBe("update subcategory");
  });

  // Test updateCategory with non-existing subcategory
  it("should throw error when subcategory id does not exist", async () => {
    const subCategoryToUpdate = getSubCategoryMock({
      id: 1000,
      name: "update subcategory",
    });
        
    await expect(subCategoryService.update(subCategoryToUpdate)).rejects.toThrow(
      NotFoundError
    );
  });

  // Test updateCategory with empty payload
  it("should throw error when subcategory payload is empty", async () => {
    await expect(subCategoryService.update(null as any)).rejects.toThrow(
      BadRequestError
    );
  });
});

// Test deleteCategory
describe("SubCategoryService.deleteSubCategory", () => {

  it("should delete a subcategory", async () => {
    const result = await subCategoryService.delete(1);
    expect(result).toBe(true);
  });

  // Test deleteCategory with non-existing subcategory
  it("should throw error when subcategory id does not exist", async () => {
    await expect(subCategoryService.delete(3)).rejects.toThrow(
      NotFoundError
    );
  });

  // Test deleteCategory with invalid id
  it("should throw error when subcategory id is invalid", async () => {
    await expect(subCategoryService.delete("a" as any)).rejects.toThrow(
      BadRequestError
    );
  });
});
