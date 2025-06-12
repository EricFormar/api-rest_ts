
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../setup";
import migration from "../../database/migrations/20250607142724-order";
import { QueryInterface } from "sequelize";
import { getOrderMock } from "../mocks/order.mock";



describe("Migration: Create Orders Table", () => {
  beforeEach(async () => {

    try {
      await queryInterface.dropTable("Orders");
    } catch (error) {
      // Ignorar si la tabla no existe, es la primera ejecución
    }
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Orders table with correct columns", async () => {
  
    await migration.up(queryInterface as QueryInterface, DataTypesTest);
  
    const tables = await queryInterface.showAllTables();
    expect(tables).toContain("Orders");

    const tableDescription = (await queryInterface.describeTable(
      "Orders"
    )) as Record<string, any>;

    expect(tableDescription.id).toBeDefined();
    expect(tableDescription.id.type).toMatch(/INTEGER/i);
    expect(tableDescription.id.primaryKey).toBe(true);

    expect(tableDescription.total).toBeDefined();
    expect(tableDescription.total.type).toMatch(/INTEGER/i);

    expect(tableDescription.statusId).toBeDefined();
    expect(tableDescription.statusId.type).toMatch(/INTEGER/i);
    
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

  it("create a new order", async () => {
    const newAddress = await getOrderMock();
       
    expect(newAddress).toBeDefined();
    expect(newAddress.id).toBe(1);
    expect(newAddress.total).toBe(100);
    expect(newAddress.statusId).toBe(1);
    expect(newAddress.userId).toBe(1);
    expect(newAddress.createdAt).toBeDefined();
    expect(newAddress.updatedAt).toBeDefined();
  })

  it("should drop the Orders table when migrating down", async () => {
  
    await migration.up(queryInterface as QueryInterface, DataTypesTest);
  
    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Orders");
  
    await migration.down(queryInterface, DataTypesTest);
  
    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Orders");
  });
});
