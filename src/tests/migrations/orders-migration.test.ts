
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../../database/setup";
import migration from "../../database/migrations/20250607142724-order";
import migrationUser from "../../database/migrations/20250607141756-user";
import migrationStatus from "../../database/migrations/20250607142616-status";
import migrationRol from "../../database/migrations/20250607141656-rol";
import { getOrderMock } from "../mocks/order.mock";
import { getRandomNumber } from "../../utils/getRandomNumber";
import { getUserMock } from "../mocks/user.mock";
import { getStatusMock } from "../mocks/status.mock";
import { getRolMock } from "../mocks/rol.mock";


describe("Migration: Create Orders Table", () => {
  
  beforeEach(async () => {
    await migration.up(queryInterface, DataTypesTest);
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Orders table with correct columns", async () => {
    
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

    await migrationStatus.up(queryInterface, DataTypesTest);
    await migrationRol.up(queryInterface, DataTypesTest);
    await migrationUser.up(queryInterface, DataTypesTest);

    const newStatus = await getStatusMock({
      id : getRandomNumber(1,10),
    });
    const newRol = await getRolMock({
      id: getRandomNumber(1,10)
    })
    const newUser = await getUserMock({
      id: getRandomNumber(1,100),
      rolId : newRol.id
    });
    const orderId = getRandomNumber(1,100);
    const newOrder = await getOrderMock({
      id: orderId,
      total: 100,
      statusId: newStatus.id,
      userId: newUser.id,
    });
       
    expect(newOrder).toBeDefined();
    expect(newOrder.id).toBe(orderId);
    expect(newOrder.total).toBe(100);
    expect(newOrder.statusId).toBe(newStatus.id);
    expect(newOrder.userId).toBe(newUser.id);
    expect(newOrder.createdAt).toBeDefined();
    expect(newOrder.updatedAt).toBeDefined();

    await migrationUser.down(queryInterface, DataTypesTest);
    await migrationStatus.down(queryInterface, DataTypesTest);
  })

  it("should drop the Orders table when migrating down", async () => {
    
    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Orders");
  
    await migration.down(queryInterface, DataTypesTest);
  
    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Orders");
  });
});
