import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../../../database/setup";
import migration from "../../../database/migrations/20250607110618-product";

describe("Migration: Create Products Table", () => {
  beforeEach(async () => {
    await migration.up(queryInterface, DataTypesTest);
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Products table with correct columns", async () => {
    
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

  it("should drop the Products table when migrating down", async () => {
    
    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Products");
  
    await migration.down(queryInterface, DataTypesTest);
  
    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Products");
  });
});
