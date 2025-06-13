import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../setup";
import migration from "../../database/migrations/20250607143040-item";
import { QueryInterface } from "sequelize";
import { getItemMock } from "../mocks/item.mock";

describe("Migration: Create Items Table", () => {
  beforeEach(async () => {

    try {
      await queryInterface.dropTable("Items");
    } catch (error) {
      // Ignorar si la tabla no existe, es la primera ejecución
    }
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Items table with correct columns", async () => {
  
    await migration.up(queryInterface as QueryInterface, DataTypesTest);
  
    const tables = await queryInterface.showAllTables();
    expect(tables).toContain("Items");

    const tableDescription = (await queryInterface.describeTable(
      "Items"
    )) as Record<string, any>;

    expect(tableDescription.id).toBeDefined();
    expect(tableDescription.id.type).toMatch(/INTEGER/i);
    expect(tableDescription.id.primaryKey).toBe(true);

    expect(tableDescription.quantity).toBeDefined();
    expect(tableDescription.quantity.type).toMatch(/INTEGER/i);

    expect(tableDescription.productId).toBeDefined();
    expect(tableDescription.productId.type).toMatch(/INTEGER/i);
    
    expect(tableDescription.orderId).toBeDefined();
    expect(tableDescription.orderId.type).toMatch(/INTEGER/i);

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

  it("create a new order", async () => {
    const newItem = await getItemMock();
       
    expect(newItem).toBeDefined();
    expect(newItem.id).toBe(1);
    expect(newItem.quantity).toBe(1);
    expect(newItem.productId).toBe(1);
    expect(newItem.orderId).toBe(1);
    expect(newItem.createdAt).toBeDefined();
    expect(newItem.updatedAt).toBeDefined();
  })

  it("should drop the Items table when migrating down", async () => {
  
    await migration.up(queryInterface as QueryInterface, DataTypesTest);
  
    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Items");
  
    await migration.down(queryInterface, DataTypesTest);
  
    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Items");
  });
});
