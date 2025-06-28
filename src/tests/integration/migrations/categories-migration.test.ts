// categories-migration.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../../../database/setup"; // Importa la configuración de la DB de prueba
import migration from "../../../database/migrations/20250607105742-category"; // Ajusta la ruta a tu archivo de migración

describe("Migration: Create Categories Table", () => {
  beforeEach(async () => {
    await migration.up(queryInterface, DataTypesTest);

  });

  afterEach(async () => {
    // Después de cada test, revertir la migración para dejar la DB limpia
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Categories table with correct columns", async () => {

    // Verifica que la tabla 'Categories' existe
    const tables = await queryInterface.showAllTables();
    expect(tables).toContain("Categories");

    // Verifica las columnas de la tabla 'Categories'
    const tableDescription = (await queryInterface.describeTable(
      "Categories"
    )) as Record<string, any>; // Tipo genérico para la descripción

    expect(tableDescription.id).toBeDefined();
    expect(tableDescription.id.type).toMatch(/INTEGER/i);
    expect(tableDescription.id.primaryKey).toBe(true);

    expect(tableDescription.name).toBeDefined();
    expect(tableDescription.name.type).toMatch(/VARCHAR\(255\)/i); // Sequelize STRING por defecto es VARCHAR(255)

    expect(tableDescription.image).toBeDefined();
    expect(tableDescription.image.type).toMatch(/VARCHAR\(255\)/i);

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

  it("should drop the Categories table when migrating down", async () => {

    // Verifica que la tabla existe antes de revertir
    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Categories");

    // Ahora, revierte la migración
    await migration.down(queryInterface, DataTypesTest);

    // Verifica que la tabla 'Categories' ya no existe
    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Categories");
  });
});
