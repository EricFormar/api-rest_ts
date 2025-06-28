import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../../../database/setup";
import migration from "../../../database/migrations/20250607111049-image";

describe("Migration: Create Images Table", () => {
  beforeEach(async () => {
    await migration.up(queryInterface, DataTypesTest);
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Images table with correct columns", async () => {

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

  it("should drop the Images table when migrating down", async () => {

    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Images");

    await migration.down(queryInterface, DataTypesTest);

    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Images");
  });
});
