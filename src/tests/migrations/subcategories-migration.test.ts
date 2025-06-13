import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../setup";
import migration from "../../database/migrations/20250607110406-subcategory";
import { QueryInterface } from "sequelize";
import { getSubCategoryMock } from "../mocks/subcategory.mock";

describe("Migration: Create Subcategories Table", () => {
  beforeEach(async () => {

    try {
      await queryInterface.dropTable("Subcategories");
    } catch (error) {
      // Ignorar si la tabla no existe, es la primera ejecución
    }
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Subcategories table with correct columns", async () => {
  
    await migration.up(queryInterface as QueryInterface, DataTypesTest);
  
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
    const newSubCategory = await getSubCategoryMock();
    expect(newSubCategory).toBeDefined();
    expect(newSubCategory.name).toBe("Test SubCategory");
  
  });

  it("should drop the Subcategories table when migrating down", async () => {
  
    await migration.up(queryInterface as QueryInterface, DataTypesTest);
  
    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Subcategories");
  
    await migration.down(queryInterface, DataTypesTest);
  
    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Subcategories");
  });
});
