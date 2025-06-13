// categories-migration.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../setup";
import migration from "../../database/migrations/20250607141656-rol";
import { QueryInterface } from "sequelize";
import { getRolMock } from "../mocks/rol.mock";

describe("Migration: Create Rols Table", () => {
  beforeEach(async () => {
    try {
      await queryInterface.dropTable("Rols");
    } catch (error) {
      // Ignorar si la tabla no existe, es la primera ejecución
    }
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Rols table with correct columns", async () => {
    // Aplica la migración
    await migration.up(queryInterface as QueryInterface, DataTypesTest);

    // Verifica que la tabla 'Rols' existe
    const tables = await queryInterface.showAllTables();
    expect(tables).toContain("Rols");

    // Verifica las columnas de la tabla 'Rols'
    const tableDescription = (await queryInterface.describeTable(
      "Rols"
    )) as Record<string, any>; // Tipo genérico para la descripción

    expect(tableDescription.id).toBeDefined();
    expect(tableDescription.id.type).toMatch(/INTEGER/i);
    expect(tableDescription.id.primaryKey).toBe(true);

    expect(tableDescription.name).toBeDefined();
    expect(tableDescription.name.type).toMatch(/VARCHAR\(255\)/i); // Sequelize STRING por defecto es VARCHAR(255)

    expect(tableDescription.createdAt).toBeDefined();
    expect(tableDescription.createdAt.type).toMatch(/DATETIME/i); // Sequelize DATE es DATETIME en SQLite
    expect(tableDescription.createdAt.allowNull).toBe(false);

    expect(tableDescription.updatedAt).toBeDefined();
    expect(tableDescription.updatedAt.type).toMatch(/DATETIME/i);
    expect(tableDescription.updatedAt.allowNull).toBe(false);

    expect(tableDescription.deletedAt).toBeDefined();
    expect(tableDescription.deletedAt.type).toMatch(/DATETIME/i);
    expect(tableDescription.deletedAt.allowNull).toBe(true);

  });

  it("should create the Rols table with correct columns", async () => {
    
    const newRol = await getRolMock();

    expect(newRol).toBeDefined();
    expect(newRol.name).toBe("Test Rol");
  });

  it("should drop the Rols table when migrating down", async () => {
    // Primero, aplica la migración
    await migration.up(queryInterface as QueryInterface, DataTypesTest);

    // Verifica que la tabla existe antes de revertir
    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Rols");

    // Ahora, revierte la migración
    await migration.down(queryInterface, DataTypesTest);

    // Verifica que la tabla 'Rols' ya no existe
    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Rols");
  });
});
