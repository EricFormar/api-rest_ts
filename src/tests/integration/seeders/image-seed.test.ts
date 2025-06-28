import { afterEach, beforeEach, describe, expect, it } from "vitest";
import seedProduct from "../../../database/seeders/20250403165339-products";
import seedSubCategory from "../../../database/seeders/20250403165315-subcategories";
import seedCategory from "../../../database/seeders/20250403165300-categories";
import seedBrand from "../../../database/seeders/20250403165300-brands";
import seedSection from "../../../database/seeders/20250403165301-sections";
import seed from "../../../database/seeders/20250403165347-images";
import migrationProduct from "../../../database/migrations/20250607110618-product";
import migrationSubCategory from "../../../database/migrations/20250607110406-subcategory";
import migrationCategory from "../../../database/migrations/20250607105742-category";
import migrationBrand from "../../../database/migrations/20250607110250-brand";
import migrationSection from "../../../database/migrations/20250607110120-section";
import migration from "../../../database/migrations/20250607111049-image";
import sequelizeConnection from "../../../database/connection";
import Image from "../../../database/models/image";
import { DataTypesTest, queryInterface } from "../../../database/setup";

describe("Image Seed", () => {

    beforeEach(async () => {
        await migrationCategory.up(queryInterface, DataTypesTest);
        await migrationSubCategory.up(queryInterface, DataTypesTest);
        await migrationBrand.up(queryInterface, DataTypesTest);
        await migrationSection.up(queryInterface, DataTypesTest);
        await migrationProduct.up(queryInterface, DataTypesTest);
        await migration.up(queryInterface, DataTypesTest);
        
        await seedCategory.up(queryInterface, sequelizeConnection);
        await seedSubCategory.up(queryInterface, sequelizeConnection);
        await seedBrand.up(queryInterface, sequelizeConnection);
        await seedSection.up(queryInterface, sequelizeConnection);
        await seedProduct.up(queryInterface, sequelizeConnection);
        await seed.up(queryInterface, sequelizeConnection);
    });

    afterEach(async () => {
        await migrationProduct.down(queryInterface, DataTypesTest);
        await migrationSubCategory.down(queryInterface, DataTypesTest);
        await migrationCategory.down(queryInterface, DataTypesTest);
        await migrationBrand.down(queryInterface, DataTypesTest);
        await migrationSection.down(queryInterface, DataTypesTest);
    })

    it("should return a section", async () => {
        const images = await Image.findAll();
        expect(images).toBeDefined();
        expect(images.length).toBeGreaterThan(0);
    });

    it("should delete all images", async () => {
        await seed.down(queryInterface, sequelizeConnection);
        const images = await Image.findAll();
        expect(images).toBeDefined();
        expect(images.length).toBe(0);
    });
});