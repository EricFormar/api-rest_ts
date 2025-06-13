// categories-migration.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../setup"; // Importa la configuración de la DB de prueba
import migration from "../../database/migrations/20250607110120-section"; // Ajusta la ruta a tu archivo de migración
import { QueryInterface } from "sequelize";
import { getSectionMock } from "../mocks/section.mock";

describe("Migration: Create Sections Table", () => {
  beforeEach(async () => {
    try {
      await queryInterface.dropTable("Sections");
    } catch (error) {
      // Ignorar si la tabla no existe, es la primera ejecución
    }
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Sections table with correct columns", async () => {
    // Aplica la migración
    await migration.up(queryInterface as QueryInterface, DataTypesTest);

    // Verifica que la tabla 'Sections' existe
    const tables = await queryInterface.showAllTables();
    expect(tables).toContain("Sections");

    // Verifica las columnas de la tabla 'Sections'
    const tableDescription = (await queryInterface.describeTable(
      "Sections"
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

  it("should insert a new section", async () => {
    const newSection = await getSectionMock();

    expect(newSection).toBeDefined();
    expect(newSection.name).toBe("Test Section");
  });

  it("should drop the Sections table when migrating down", async () => {
    // Primero, aplica la migración
    await migration.up(queryInterface as QueryInterface, DataTypesTest);

    // Verifica que la tabla existe antes de revertir
    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Sections");

    // Ahora, revierte la migración
    await migration.down(queryInterface, DataTypesTest);

    // Verifica que la tabla 'Sections' ya no existe
    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Sections");
  });
});
