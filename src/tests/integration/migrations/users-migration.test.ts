import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../../../database/setup";
import migration from "../../../database/migrations/20250607141756-user";
import migrationRol from "../../../database/migrations/20250607141656-rol";
import { QueryInterface } from "sequelize";
import { getUserMock } from "../../mocks/user.mock";
import { getRolMock } from "../../mocks/rol.mock";
import { getRandomNumber } from "../../../utils/getRandomNumber";

describe("Migration: Create Users Table", () => {
  beforeEach(async () => {
    await migration.up(queryInterface as QueryInterface, DataTypesTest);
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);    
  });

  it("should create the Users table with correct columns", async () => {

    const tables = await queryInterface.showAllTables();
    expect(tables).toContain("Users");

    const tableDescription = (await queryInterface.describeTable(
      "Users"
    )) as Record<string, any>;

    expect(tableDescription.id).toBeDefined();
    expect(tableDescription.id.type).toMatch(/INTEGER/i);
    expect(tableDescription.id.primaryKey).toBe(true);

    expect(tableDescription.name).toBeDefined();
    expect(tableDescription.name.type).toMatch(/VARCHAR\(50\)/i);

    expect(tableDescription.surname).toBeDefined();
    expect(tableDescription.surname.type).toMatch(/VARCHAR\(50\)/i);

    expect(tableDescription.email).toBeDefined();
    expect(tableDescription.email.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.password).toBeDefined();
    expect(tableDescription.password.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.token).toBeDefined();
    expect(tableDescription.token.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.locked).toBeDefined();
    expect(tableDescription.locked.type).toMatch(/TINYINT\(1\)/i);

    expect(tableDescription.image).toBeDefined();
    expect(tableDescription.image.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.validated).toBeDefined();
    expect(tableDescription.validated.type).toMatch(/TINYINT\(1\)/i);

    expect(tableDescription.rolId).toBeDefined();
    expect(tableDescription.rolId.type).toMatch(/INTEGER/i);

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

  it("should drop the Users table when migrating down", async () => {

    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Users");

    await migration.down(queryInterface, DataTypesTest);

    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Users");
  });
});
