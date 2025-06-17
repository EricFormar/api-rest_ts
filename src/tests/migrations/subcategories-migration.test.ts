import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../../database/setup";
import migration from "../../database/migrations/20250607110406-subcategory";
import migrationCategoy from "../../database/migrations/20250607105742-category"; // Ajusta la ruta a tu archivo de migración
import { getSubCategoryMock } from "../mocks/subcategory.mock";
import { getCategoryMock } from "../mocks/category.mock";
import { getRandomNumber } from "../../utils/getRandomNumber";

describe("Migration: Create Subcategories Table", () => {
  beforeEach(async () => {
    await migration.up(queryInterface, DataTypesTest);
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Subcategories table with correct columns", async () => {
    
    const tables = await queryInterface.showAllTables();
    expect(tables).toContain("Subcategories");

    const tableDescription = (await queryInterface.describeTable(
      "Subcategories"
    )) as Record<string, any>;

    expect(tableDescription.id).toBeDefined();
    expect(tableDescription.id.type).toMatch(/INTEGER/i);
    expect(tableDescription.id.primaryKey).toBe(true);

    expect(tableDescription.name).toBeDefined();
    expect(tableDescription.name.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.image).toBeDefined();
    expect(tableDescription.image.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.categoryId).toBeDefined();
    expect(tableDescription.categoryId.type).toMatch(/INTEGER/i);

    expect(tableDescription.createdAt).toBeDefined();
    expect(tableDescription.createdAt.type).toMatch(/DATETIME/i);
    expect(tableDescription.createdAt.allowNull).toBe(false);

    expect(tableDescription.updatedAt).toBeDefined();
    expect(tableDescription.updatedAt.type).toMatch(/DATETIME/i);
    expect(tableDescription.updatedAt.allowNull).toBe(false);

    expect(tableDescription.deletedAt).toBeDefined();
    expect(tableDescription.deletedAt.type).toMatch(/DATETIME/i);
    expect(tableDescription.deletedAt.allowNull).toBe(true);
  });

  it("should insert a new Subcategory into the Subcategories table", async () => {
    await migrationCategoy.up(queryInterface, DataTypesTest);
    const newCategory = await getCategoryMock({
      id : getRandomNumber(1,10),
    })
    
    const newSubCategory = await getSubCategoryMock({
      id: 1,
      name: "Test SubCategory",
      image: "test-image.jpg",
      categoryId: newCategory.id,
    });

    expect(newSubCategory).toBeDefined();
    expect(newSubCategory.id).toBe(1);
    expect(newSubCategory.name).toBe("Test SubCategory");
    expect(newSubCategory.image).toBe("test-image.jpg");
    expect(newSubCategory.categoryId).toBe(newCategory.id);
    await migration.down(queryInterface, DataTypesTest);
    await migrationCategoy.down(queryInterface, DataTypesTest);
  });

  it("should drop the Subcategories table when migrating down", async () => {
    
    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Subcategories");
  
    await migration.down(queryInterface, DataTypesTest);
  
    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Subcategories");
  });
});
