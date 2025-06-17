import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../../database/setup";
import migration from "../../database/migrations/20250607142616-status";
import { getStatusMock } from "../mocks/status.mock";
import { getRandomNumber } from "../../utils/getRandomNumber";

describe("Migration: Create Statuses Table", () => {
  beforeEach(async () => {
    await migration.up(queryInterface, DataTypesTest);
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Statuses table with correct columns", async () => {

    const tables = await queryInterface.showAllTables();
    expect(tables).toContain("Statuses");

    const tableDescription = (await queryInterface.describeTable(
      "Statuses"
    )) as Record<string, any>;

    expect(tableDescription.id).toBeDefined();
    expect(tableDescription.id.type).toMatch(/INTEGER/i);
    expect(tableDescription.id.primaryKey).toBe(true);

    expect(tableDescription.name).toBeDefined();
    expect(tableDescription.name.type).toMatch(/VARCHAR\(255\)/i);

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

  it("should create the Statuses table with correct indexes", async () => {
    const newStatus = await getStatusMock({
      id : getRandomNumber(1,10),
      name : "Test Status"
    });

    expect(newStatus).toBeDefined();
    expect(newStatus.name).toBe("Test Status");
  });

  it("should drop the Statuses table when migrating down", async () => {

    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Statuses");

    await migration.down(queryInterface, DataTypesTest);

    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Statuses");
  });
});
