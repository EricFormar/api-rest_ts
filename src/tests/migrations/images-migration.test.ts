import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { queryInterface, DataTypesTest } from "../setup";
import migration from "../../database/migrations/20250607111049-image";
import migrationBrand from "../../database/migrations/20250607110250-brand";
import migrationCategory from "../../database/migrations/20250607105742-category";
import migrationSubcategory from "../../database/migrations/20250607110406-subcategory";
import migrationSection from "../../database/migrations/20250607110120-section"; // Ajusta la ruta a tu archivo de migración

import migrationProduct from "../../database/migrations/20250607110618-product";
import { getImageMock } from "../mocks/image.mock";
import { getProductMock } from "../mocks/product.mock";
import { getCategoryMock } from "../mocks/category.mock";
import { getRandomNumber } from "../../utils/getRandomNumber";
import { getSubCategoryMock } from "../mocks/subcategory.mock";
import { getSectionMock } from "../mocks/section.mock";
import { getBrandMock } from "../mocks/brand.mock";

describe("Migration: Create Images Table", () => {
  beforeEach(async () => {
    await migration.up(queryInterface, DataTypesTest);
  });

  afterEach(async () => {
    await migration.down(queryInterface, DataTypesTest);
  });

  it("should create the Images table with correct columns", async () => {

    const tables = await queryInterface.showAllTables();
    expect(tables).toContain("Images");

    const tableDescription = (await queryInterface.describeTable(
      "Images"
    )) as Record<string, any>;

    expect(tableDescription.id).toBeDefined();
    expect(tableDescription.id.type).toMatch(/INTEGER/i);
    expect(tableDescription.id.primaryKey).toBe(true);

    expect(tableDescription.file).toBeDefined();
    expect(tableDescription.file.type).toMatch(/VARCHAR\(255\)/i);

    expect(tableDescription.productId).toBeDefined();
    expect(tableDescription.productId.type).toMatch(/INTEGER/i);

    expect(tableDescription.createdAt).toBeDefined();
    expect(tableDescription.createdAt.type).toMatch(/DATE/i);
    expect(tableDescription.updatedAt).toBeDefined();
    expect(tableDescription.updatedAt.type).toMatch(/DATE/i);
    expect(tableDescription.deletedAt).toBeDefined();
    expect(tableDescription.deletedAt.type).toMatch(/DATE/i);
  });

  it("should create the Images table with foreign key constraint", async () => {
    await migrationCategory.up(queryInterface, DataTypesTest);
    await migrationSubcategory.up(queryInterface, DataTypesTest);
    await migrationSection.up(queryInterface, DataTypesTest);
    await migrationBrand.up(queryInterface, DataTypesTest);
    await migrationProduct.up(queryInterface, DataTypesTest);
    const newCategory = await getCategoryMock({
      id : getRandomNumber(1,1000)
    });
    const newSubCategory = await getSubCategoryMock({
      id : getRandomNumber(1,1000),
      categoryId : newCategory.id
    });
    const newSection = await getSectionMock({
      id : getRandomNumber(1,1000),
    });
    const newBrand = await getBrandMock({
      id : getRandomNumber(1,1000)
    });
    const newProduct = await getProductMock({
      id: getRandomNumber(1,1000),
      subcategoryId : newSubCategory.id,
      sectionId : newSection.id,
      brandId : newBrand.id,
      categoryId : newCategory.id,
    });
    const newImage = await getImageMock({
      file : "test.jpg",
      productId : newProduct.id
    });

    expect(newImage).toBeDefined();
    expect(newImage.file).toBe("test.jpg");
    expect(newImage.productId).toBe(newProduct.id);
    
    await migrationProduct.down(queryInterface, DataTypesTest);
    await migrationSubcategory.down(queryInterface, DataTypesTest);
    await migrationCategory.down(queryInterface, DataTypesTest);
    await migrationSection.down(queryInterface, DataTypesTest);
    await migrationBrand.down(queryInterface, DataTypesTest);
  });

  it("should drop the Images table when migrating down", async () => {

    let tables = await queryInterface.showAllTables();
    expect(tables).toContain("Images");

    await migration.down(queryInterface, DataTypesTest);

    tables = await queryInterface.showAllTables();
    expect(tables).not.toContain("Images");
  });
});
