import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CategoryService } from "../../services/category.service";
import migration from "../../database/migrations/20250607105742-category";
import { DataTypesTest, queryInterface } from "../../database/setup";
import { QueryInterface } from "sequelize";
import { getCategoryMock } from "../mocks/category.mock";
import { BadRequestError, NotFoundError } from "../../errors/HttpError";

describe("Category Service", () => {
  const categoryService = new CategoryService();

  beforeEach(async () => {
    await migration.up(queryInterface as QueryInterface, DataTypesTest);
  });

  afterEach(async () => {
    await migration.down(queryInterface as QueryInterface, DataTypesTest);
  });

  // Test getAllCategories
  it("should get all categories", async () => {
    await getCategoryMock({
      id: 1,
      name: "Test Category",
    });
    const categories = await categoryService.getAllCategories();
    expect(categories.length).toBeGreaterThan(0);
  });

  // Test getCategoryById
  it("should get category by id", async () => {
    await getCategoryMock({
      id: 1,
      name: "Test Category",
    });
    const category = await categoryService.getCategoryById(1);
    expect(category).toBeDefined();
  });

  // Test getCategoryById with non-existing category
  it("should throw error when category id does not exist", async () => {
    await expect(categoryService.getCategoryById(2)).rejects.toThrow(
      NotFoundError
    );
  });

  // Test getCategoryById widthout id
  it("should throw error when category id is missing", async () => {
    await expect(categoryService.getCategoryById(null as any)).rejects.toThrow(
      BadRequestError
    );
  });

  // Test getCategoryById with invalid id
  it("should throw error when category id is invalid", async () => {
    await expect(categoryService.getCategoryById("A" as any)).rejects.toThrow(
      BadRequestError
    );
  });

  // Test getCategoryByName
  it("should get category by name", async () => {
    await getCategoryMock({
      id: 1,
      name: "Test Category",
    });
    const category = await categoryService.findCategory({
      name: "Test Category",
    });
    expect(category).toBeDefined();
    expect(category?.name).toBe("Test Category");
  });

  // Test getCategoryByName with non-existing category
  it("should throw error when category name does not exist", async () => {
    await expect(
      categoryService.findCategory({
        name: "Non-existing Category",
      })
    ).rejects.toThrow(NotFoundError);
  });

  // Test findCategory with empty query string
  it("should throw error when query string is empty", async () => {
    await expect(categoryService.findCategory({})).rejects.toThrow(
      BadRequestError
    );
  });

  // Test createCategory
  it("should create a category", async () => {
    const category = await categoryService.createCategory({
      name: "Test Category",
      image: "Test Image",
    });
    expect(category).toBeDefined();
  });

  // Test createCategory with invalid data
  it("should throw error when invalid data", async () => {
    await expect(
      categoryService.createCategory({
        name: "",
        image: "",
      })
    ).rejects.toThrow(BadRequestError);
  });

  // Test updateCategory
  it("should update a category", async () => {
    await getCategoryMock({
      id: 1,
      name: "Test Category",
    });
    const category = await categoryService.updateCategory(1, {
      name: "Updated Category",
    });
    expect(category).toBeDefined();
    expect(category?.name).toBe("Updated Category");
  });

  // Test updateCategory with non-existing category
  it("should throw error when category id does not exist", async () => {
    await expect(
      categoryService.updateCategory(2, {
        name: "Updated Category",
      })
    ).rejects.toThrow(NotFoundError);
  });

  // Test updateCategory with empty payload
  it("should throw error when category payload is empty", async () => {
    await expect(categoryService.updateCategory(1, {})).rejects.toThrow(
      BadRequestError
    );
  });

  // Test updateCategory without category id
  it("should throw error when category payload is empty", async () => {
    await expect(categoryService.updateCategory(null as any, {})).rejects.toThrow(
      BadRequestError
    );
  });

  // Test deleteCategory
  it("should delete a category", async () => {
    await getCategoryMock({
      id: 1,
      name: "Test Category",
    });
    const response = await categoryService.deleteCategory(1);
    await expect(categoryService.getCategoryById(1)).rejects.toThrow(
      NotFoundError
    );
  });

  // Test deleteCategory with non-existing category
  it("should throw error when category id does not exist", async () => {
    await expect(categoryService.deleteCategory(2)).rejects.toThrowError();
  });

  // Test deleteCategory with invalid id
  it("should throw error when category id is invalid", async () => {
    await expect(categoryService.deleteCategory(0)).rejects.toThrowError();
  });
});
