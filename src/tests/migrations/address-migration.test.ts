
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../../database/setup";
import migration from "../../database/migrations/20250607142315-address";
import migrationUser from "../../database/migrations/20250607141756-user";
import migrationRol from "../../database/migrations/20250607141656-rol";
import { QueryInterface } from "sequelize";
import { getAddressMock } from "../mocks/address.mock";
import { getUserMock } from "../mocks/user.mock";
import { getRolMock } from "../mocks/rol.mock";

describe("Migration: Create Addresses Table", () => {
  beforeEach(async () => {
    await migration.up(queryInterface, DataTypesTest);
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Addresses table with correct columns", async () => {
  
    await migration.up(queryInterface as QueryInterface, DataTypesTest);
  
    const tables = await queryInterface.showAllTables();
    expect(tables).toContain("Addresses");

    const tableDescription = (await queryInterface.describeTable(
      "Addresses"
    )) as Record<string, any>;

    expect(tableDescription.id).toBeDefined();
    expect(tableDescription.id.type).toMatch(/INTEGER/i);
    expect(tableDescription.id.primaryKey).toBe(true);

    expect(tableDescription.location).toBeDefined();
    expect(tableDescription.location.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.city).toBeDefined();
    expect(tableDescription.city.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.province).toBeDefined();
    expect(tableDescription.province.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.country).toBeDefined();
    expect(tableDescription.country.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.postalCode).toBeDefined();
    expect(tableDescription.postalCode.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.userId).toBeDefined();
    expect(tableDescription.userId.type).toMatch(/INTEGER/i);

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

  it("create a new address", async () => {
    await migrationRol.up(queryInterface as QueryInterface, DataTypesTest);
    const newRol = await getRolMock({
      id: 1,
      name: "any rol",
    });
    await migrationUser.up(queryInterface as QueryInterface, DataTypesTest);
    const newUser = await getUserMock({
      name : "any name",
      rolId: newRol.id,
    });

    const newAddress = await getAddressMock({
      id: 1,
      location: "any location",
      city: "any city",
      province: "any province",
      country: "any country",
      postalCode: "any postal code",
      userId: newUser.id,
    });
       
    expect(newAddress).toBeDefined();
    expect(newAddress.location).toBe("any location");
    expect(newAddress.city).toBe("any city");
    expect(newAddress.province).toBe("any province");
    expect(newAddress.country).toBe("any country");
    expect(newAddress.postalCode).toBe("any postal code");
    expect(newAddress.userId).toBe(newUser.id);
    expect(newAddress.createdAt).toBeDefined();
    expect(newAddress.updatedAt).toBeDefined();

    await migrationUser.down(queryInterface, DataTypesTest);
  })

  it("should drop the Addresses table when migrating down", async () => {
  
    await migration.up(queryInterface as QueryInterface, DataTypesTest);
  
    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Addresses");
  
    await migration.down(queryInterface, DataTypesTest);
  
    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Addresses");
  });
});
