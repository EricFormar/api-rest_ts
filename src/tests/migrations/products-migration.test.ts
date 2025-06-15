import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../setup";
import migration from "../../database/migrations/20250607110618-product";
import migrationSection from "../../database/migrations/20250607110120-section";
import migrationCategory from "../../database/migrations/20250607105742-category";
import migrationSubcategory from "../../database/migrations/20250607110406-subcategory";
import migrationBrand from "../../database/migrations/20250607110250-brand";
import { getProductMock } from "../mocks/product.mock";
import { getCategoryMock } from "../mocks/category.mock";
import { getRandomNumber } from "../../utils/getRandomNumber";
import { getSubCategoryMock } from "../mocks/subcategory.mock";
import { getSectionMock } from "../mocks/section.mock";
import { getBrandMock } from "../mocks/brand.mock";



describe("Migration: Create Products Table", () => {
  beforeEach(async () => {
    await migration.up(queryInterface, DataTypesTest);
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Products table with correct columns", async () => {
    
    const tables = await queryInterface.showAllTables();
    expect(tables).toContain("Products");

    const tableDescription = (await queryInterface.describeTable(
      "Products"
    )) as Record<string, any>;

    expect(tableDescription.id).toBeDefined();
    expect(tableDescription.id.type).toMatch(/INTEGER/i);
    expect(tableDescription.id.primaryKey).toBe(true);

    expect(tableDescription.name).toBeDefined();
    expect(tableDescription.name.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.price).toBeDefined();
    expect(tableDescription.price.type).toMatch(/INTEGER/i);

    expect(tableDescription.discount).toBeDefined();
    expect(tableDescription.discount.type).toMatch(/INTEGER/i);
    
    expect(tableDescription.description).toBeDefined();
    expect(tableDescription.description.type).toMatch(/TEXT/i);
    
    expect(tableDescription.sectionId).toBeDefined();
    expect(tableDescription.sectionId.type).toMatch(/INTEGER/i);

    expect(tableDescription.brandId).toBeDefined();
    expect(tableDescription.brandId.type).toMatch(/INTEGER/i);

    expect(tableDescription.categoryId).toBeDefined();
    expect(tableDescription.categoryId.type).toMatch(/INTEGER/i);

    expect(tableDescription.subcategoryId).toBeDefined();
    expect(tableDescription.subcategoryId.type).toMatch(/INTEGER/i);

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

  it("should create a new product", async () => {
    
    await migrationCategory.up(queryInterface, DataTypesTest);
    await migrationSubcategory.up(queryInterface, DataTypesTest);
    await migrationSection.up(queryInterface, DataTypesTest);
    await migrationBrand.up(queryInterface, DataTypesTest);

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
      name : "Test Product",
      description : "Test Description",
      price : 100,
      discount : 10,
      subcategoryId : newSubCategory.id,
      sectionId : newSection.id,
      brandId : newBrand.id,
      categoryId : newCategory.id,
    });
    expect(newProduct).toBeDefined();
    expect(newProduct.name).toBe("Test Product");
    expect(newProduct.description).toBe("Test Description");
    expect(newProduct.price).toBe(100);
    expect(newProduct.discount).toBe(10);
    expect(newProduct.subcategoryId).toBe(newSubCategory.id);
    expect(newProduct.sectionId).toBe(newSection.id);
    expect(newProduct.brandId).toBe(newBrand.id);
    expect(newProduct.categoryId).toBe(newCategory.id);

    await migration.down(queryInterface, DataTypesTest);
    await migrationSection.down(queryInterface, DataTypesTest);
    await migrationSubcategory.down(queryInterface, DataTypesTest);
    await migrationCategory.down(queryInterface, DataTypesTest);
    await migrationBrand.down(queryInterface, DataTypesTest);
  });

  it("should drop the Products table when migrating down", async () => {
    
    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Products");
  
    await migration.down(queryInterface, DataTypesTest);
  
    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Products");
  });
});
