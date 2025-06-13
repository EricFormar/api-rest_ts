import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../setup";
import migration from "../../database/migrations/20250607110618-product";
import { QueryInterface } from "sequelize";
import { getProductMock } from "../mocks/product.mock";



describe("Migration: Create Products Table", () => {
  beforeEach(async () => {

    try {
      await queryInterface.dropTable("Products");
    } catch (error) {
      // Ignorar si la tabla no existe, es la primera ejecución
    }
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Products table with correct columns", async () => {
  
    await migration.up(queryInterface as QueryInterface, DataTypesTest);
  
    const tables = await queryInterface.showAllTables();
    expect(tables).toContain("Products");

    const tableDescription = (await queryInterface.describeTable(
      "Products"
    )) as Record<string, any>;

    expect(tableDescription.id).toBeDefined();
    expect(tableDescription.id.type).toMatch(/INTEGER/i);
    expect(tableDescription.id.primaryKey).toBe(true);

    expect(tableDescription.name).toBeDefined();
    expect(tableDescription.name.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.price).toBeDefined();
    expect(tableDescription.price.type).toMatch(/INTEGER/i);

    expect(tableDescription.discount).toBeDefined();
    expect(tableDescription.discount.type).toMatch(/INTEGER/i);
    
    expect(tableDescription.description).toBeDefined();
    expect(tableDescription.description.type).toMatch(/TEXT/i);
    
    expect(tableDescription.sectionId).toBeDefined();
    expect(tableDescription.sectionId.type).toMatch(/INTEGER/i);

    expect(tableDescription.brandId).toBeDefined();
    expect(tableDescription.brandId.type).toMatch(/INTEGER/i);

    expect(tableDescription.categoryId).toBeDefined();
    expect(tableDescription.categoryId.type).toMatch(/INTEGER/i);

    expect(tableDescription.subcategoryId).toBeDefined();
    expect(tableDescription.subcategoryId.type).toMatch(/INTEGER/i);

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

  it("should create a new product", async () => {

    const newProduct = await getProductMock();
    expect(newProduct).toBeDefined();
    expect(newProduct.name).toBe("Test Product");
    expect(newProduct.description).toBe("Test Description");
    expect(newProduct.price).toBe(100);
    expect(newProduct.discount).toBe(10);
    expect(newProduct.subcategoryId).toBe(1);
    expect(newProduct.sectionId).toBe(1);
    expect(newProduct.brandId).toBe(1);
    expect(newProduct.categoryId).toBe(1);
  });

  it("should drop the Products table when migrating down", async () => {
  
    await migration.up(queryInterface as QueryInterface, DataTypesTest);
  
    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Products");
  
    await migration.down(queryInterface, DataTypesTest);
  
    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Products");
  });
});
