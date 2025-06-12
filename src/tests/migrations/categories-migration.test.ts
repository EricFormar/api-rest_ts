// categories-migration.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../setup"; // Importa la configuración de la DB de prueba
import migration from "../../database/migrations/20250607105742-category"; // Ajusta la ruta a tu archivo de migración
import { QueryInterface } from "sequelize";
import { getCategoryMock } from "../mocks/category.mock";

describe("Migration: Create Categories Table", () => {
  beforeEach(async () => {
    // Antes de cada test, asegura que la base de datos esté limpia
    // Esto es importante si tus tests no son completamente aislados (por ejemplo, si no usas `force: true` en sequelize.sync)
    // Para migraciones, es común revertir y aplicar de nuevo
    try {
      await queryInterface.dropTable("Categories");
    } catch (error) {
      // Ignorar si la tabla no existe, es la primera ejecución
    }
  });

  afterEach(async () => {
    // Después de cada test, revertir la migración para dejar la DB limpia
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Categories table with correct columns", async () => {
    // Aplica la migración
    await migration.up(queryInterface as QueryInterface, DataTypesTest);

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

  it("should create a new category", async () => {
    const newCategory = await getCategoryMock();
    expect(newCategory).toBeDefined();
    expect(newCategory.name).toBe("Test Category");
    expect(newCategory.image).toBe("test.jpg");
  });

  it("should drop the Categories table when migrating down", async () => {
    // Primero, aplica la migración
    await migration.up(queryInterface as QueryInterface, DataTypesTest);

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
