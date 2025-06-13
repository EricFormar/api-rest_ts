import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../setup";
import migration from "../../database/migrations/20250607111049-image";
import migrationProduct from "../../database/migrations/20250607110618-product";
import { QueryInterface } from "sequelize";
import { getImageMock } from "../mocks/image.mock";

describe("Migration: Create Images Table", () => {
  beforeEach(async () => {
    try {
      await queryInterface.dropTable("Images");
      await queryInterface.dropTable("Products");
    } catch (error) {
      // Ignorar si la tabla no existe, es la primera ejecución
    }
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
    await migrationProduct.down(queryInterface, DataTypesTest);
  });

  it("should create the Images table with correct columns", async () => {
    await migration.up(queryInterface as QueryInterface, DataTypesTest);

    const tables = await queryInterface.showAllTables();
    expect(tables).toContain("Images");

    const tableDescription = (await queryInterface.describeTable(
      "Images"
    )) as Record<string, any>;

    expect(tableDescription.id).toBeDefined();
    expect(tableDescription.id.type).toMatch(/INTEGER/i);
    expect(tableDescription.id.primaryKey).toBe(true);

    expect(tableDescription.file).toBeDefined();
    expect(tableDescription.file.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.productId).toBeDefined();
    expect(tableDescription.productId.type).toMatch(/INTEGER/i);

    expect(tableDescription.createdAt).toBeDefined();
    expect(tableDescription.createdAt.type).toMatch(/DATE/i);
    expect(tableDescription.updatedAt).toBeDefined();
    expect(tableDescription.updatedAt.type).toMatch(/DATE/i);
    expect(tableDescription.deletedAt).toBeDefined();
    expect(tableDescription.deletedAt.type).toMatch(/DATE/i);
  });

  it("should create the Images table with foreign key constraint", async () => {
    const newImage = await getImageMock();

    expect(newImage).toBeDefined();
    expect(newImage.file).toBe("test.jpg");
    expect(newImage.productId).toBe(1);
  });

  it("should drop the Images table when migrating down", async () => {
    await migration.up(queryInterface as QueryInterface, DataTypesTest);

    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Images");

    await migration.down(queryInterface, DataTypesTest);

    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Images");
  });
});
