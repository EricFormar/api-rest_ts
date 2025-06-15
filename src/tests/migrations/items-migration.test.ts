import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../setup";
import migration from "../../database/migrations/20250607143040-item";
import migrationProduct from "../../database/migrations/20250607110618-product";
import migrationOrder from "../../database/migrations/20250607142724-order";
import migrationSection from "../../database/migrations/20250607110120-section";
import migrationCategory from "../../database/migrations/20250607105742-category";
import migrationSubcategory from "../../database/migrations/20250607110406-subcategory";
import migrationBrand from "../../database/migrations/20250607110250-brand";
import migrationUser from "../../database/migrations/20250607141756-user";
import migrationRol from "../../database/migrations/20250607141656-rol";
import migrationStatus from "../../database/migrations/20250607142616-status";

import { QueryInterface } from "sequelize";
import { getItemMock } from "../mocks/item.mock";
import { getProductMock } from "../mocks/product.mock";
import { getOrderMock } from "../mocks/order.mock";
import { getRandomNumber } from "../../utils/getRandomNumber";
import { getUserMock } from "../mocks/user.mock";
import { getBrandMock } from "../mocks/brand.mock";
import { getSectionMock } from "../mocks/section.mock";
import { getSubCategoryMock } from "../mocks/subcategory.mock";
import { getCategoryMock } from "../mocks/category.mock";
import { getRolMock } from "../mocks/rol.mock";
import { getStatusMock } from "../mocks/status.mock";

describe("Migration: Create Items Table", () => {
  beforeEach(async () => {
    await migration.up(queryInterface, DataTypesTest);
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Items table with correct columns", async () => {

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

  it("create a new item", async () => {
    await migrationBrand.up(queryInterface as QueryInterface, DataTypesTest);
    await migrationSection.up(queryInterface as QueryInterface, DataTypesTest);
    await migrationCategory.up(queryInterface as QueryInterface, DataTypesTest);
    await migrationSubcategory.up(queryInterface as QueryInterface, DataTypesTest);
    await migrationRol.up(queryInterface as QueryInterface, DataTypesTest);
    await migrationUser.up(queryInterface as QueryInterface, DataTypesTest);
    await migrationProduct.up(queryInterface as QueryInterface, DataTypesTest);
    await migrationStatus.up(queryInterface as QueryInterface, DataTypesTest);
    await migrationOrder.up(queryInterface as QueryInterface, DataTypesTest);

    const newCategory = await getCategoryMock({
      id : getRandomNumber(1,100)
    });
    const newSubCategory = await getSubCategoryMock({
      id : getRandomNumber(1,100),
      categoryId : newCategory.id
    });
    const newSection = await getSectionMock({
      id : getRandomNumber(1,100),
    });
    const newBrand = await getBrandMock({
      id : getRandomNumber(1,100)
    });
    const newProduct = await getProductMock({
      id : getRandomNumber(1,100),
      subcategoryId : newSubCategory.id,
      sectionId : newSection.id,
      brandId : newBrand.id,
      categoryId : newCategory.id,
    });
    const newRol = await getRolMock({
      id : getRandomNumber(1,100),
    })
    const newUser = await getUserMock({
      id : getRandomNumber(1,100),
      rolId : newRol.id
    })
    const newStatus = await getStatusMock({
      id : getRandomNumber(1,100),
    })
    const newOrder = await getOrderMock({
      id : getRandomNumber(1,100),
      userId : newUser.id,
      statusId : newStatus.id
    });

    const newItem = await getItemMock({
      id : getRandomNumber(1,100),
      quantity : 10,
      productId : newProduct.id,
      orderId : newOrder.id,
    });
       
    expect(newItem).toBeDefined();
    expect(newItem.id).toBe(newItem.id);
    expect(newItem.quantity).toBe(10);
    expect(newItem.productId).toBe(newProduct.id);
    expect(newItem.orderId).toBe(newOrder.id);
    expect(newItem.createdAt).toBeDefined();
    expect(newItem.updatedAt).toBeDefined();
    
    await migration.down(queryInterface as QueryInterface, DataTypesTest);
    await migrationProduct.down(queryInterface as QueryInterface, DataTypesTest);
    await migrationBrand.down(queryInterface as QueryInterface, DataTypesTest);
    await migrationSection.down(queryInterface as QueryInterface, DataTypesTest);
    await migrationSubcategory.down(queryInterface as QueryInterface, DataTypesTest);
    await migrationCategory.down(queryInterface as QueryInterface, DataTypesTest);
    await migrationUser.down(queryInterface as QueryInterface, DataTypesTest);
    await migrationOrder.down(queryInterface as QueryInterface, DataTypesTest);
    await migrationRol.down(queryInterface as QueryInterface, DataTypesTest);
    
  })

  it("should drop the Items table when migrating down", async () => {
    
    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Items");
  
    await migration.down(queryInterface, DataTypesTest);
  
    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Items");
  });
});
