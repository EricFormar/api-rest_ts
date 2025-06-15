import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../setup";
import migration from "../../database/migrations/20250607110250-brand";
import { getBrandMock } from "../mocks/brand.mock";

describe("Migration: Create Brands Table", () => {
  beforeEach(async () => {
    await migration.up(queryInterface, DataTypesTest);
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Brands table with correct columns", async () => {

    const tables = await queryInterface.showAllTables();
    expect(tables).toContain("Brands");

    const tableDescription = (await queryInterface.describeTable(
      "Brands"
    )) as Record<string, any>;

    expect(tableDescription.id).toBeDefined();
    expect(tableDescription.id.type).toMatch(/INTEGER/i);
    expect(tableDescription.id.primaryKey).toBe(true);

    expect(tableDescription.name).toBeDefined();
    expect(tableDescription.name.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.image).toBeDefined();
    expect(tableDescription.image.type).toMatch(/VARCHAR\(255\)/i);

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

  it("should insert a new brand", async () => {
    const newBrand = await getBrandMock({
      name : "Test Brand",
      image : "any image"
    });
    expect(newBrand).toBeDefined();
    expect(newBrand.name).equal("Test Brand");
  });

  it("should drop the Brands table when migrating down", async () => {

    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Brands");

    await migration.down(queryInterface, DataTypesTest);

    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Brands");
  });
});
