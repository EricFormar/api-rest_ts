import { afterEach, beforeEach, describe, expect, it } from "vitest";
import seed from "../../database/seeders/20250403165339-products";
import seedSubCategory from "../../database/seeders/20250403165315-subcategories";
import seedCategory from "../../database/seeders/20250403165300-categories";
import seedBrand from "../../database/seeders/20250403165300-brands";
import seedSection from "../../database/seeders/20250403165301-sections";
import migration from "../../database/migrations/20250607110618-product";
import migrationSubCategory from "../../database/migrations/20250607110406-subcategory";
import migrationCategory from "../../database/migrations/20250607105742-category";
import migrationBrand from "../../database/migrations/20250607110250-brand";
import migrationSection from "../../database/migrations/20250607110120-section";
import sequelizeConnection from "../../database/connection";
import Product from "../../database/models/product";
import { DataTypesTest, queryInterface } from "../../database/setup";

describe("Product Seed", () => {

    beforeEach(async () => {
        await migrationCategory.up(queryInterface, DataTypesTest);
        await migrationSubCategory.up(queryInterface, DataTypesTest);
        await migrationBrand.up(queryInterface, DataTypesTest);
        await migrationSection.up(queryInterface, DataTypesTest);
        await migration.up(queryInterface, DataTypesTest);

        await seedCategory.up(queryInterface, sequelizeConnection);
        await seedSubCategory.up(queryInterface, sequelizeConnection);
        await seedBrand.up(queryInterface, sequelizeConnection);
        await seedSection.up(queryInterface, sequelizeConnection);
        await seed.up(queryInterface, sequelizeConnection);
    });

    afterEach(async () => {
        await migration.down(queryInterface, DataTypesTest);
        await migrationSubCategory.down(queryInterface, DataTypesTest);
        await migrationCategory.down(queryInterface, DataTypesTest);
        await migrationBrand.down(queryInterface, DataTypesTest);
        await migrationSection.down(queryInterface, DataTypesTest);
    })

    it("should return a section", async () => {
        const products = await Product.findAll();
        expect(products).toBeDefined();
        expect(products.length).toBeGreaterThan(0);
    });

    it("should delete all products", async () => {
        await seed.down(queryInterface, sequelizeConnection);
        const products = await Product.findAll();
        expect(products).toBeDefined();
        expect(products.length).toBe(0);
    });
});