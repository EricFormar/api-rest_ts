import { afterEach, beforeEach, describe, expect, it } from "vitest";
import seed from "../../database/seeders/20250403165315-subcategories";
import seedCategory from "../../database/seeders/20250403165300-categories";
import migration from "../../database/migrations/20250607110406-subcategory";
import migrationCategory from "../../database/migrations/20250607105742-category";
import sequelizeConnection from "../../database/connection";
import SubCategory from "../../database/models/subcategory";
import { DataTypesTest, queryInterface } from "../../database/setup";

describe("SubCategory Seed", () => {

    beforeEach(async () => {
        await migrationCategory.up(queryInterface, DataTypesTest);
        await migration.up(queryInterface, DataTypesTest);

        await seedCategory.up(queryInterface, sequelizeConnection);
        await seed.up(queryInterface, sequelizeConnection);
    });

    afterEach(async () => {
        await migration.down(queryInterface, DataTypesTest);
        await migrationCategory.down(queryInterface, DataTypesTest);
    })

    it("should return a section", async () => {
        const subcategories = await SubCategory.findAll();
        expect(subcategories).toBeDefined();
        expect(subcategories.length).toBeGreaterThan(0);
    });

    it("should delete all subcategories", async () => {
        await seed.down(queryInterface, sequelizeConnection);
        const subcategories = await SubCategory.findAll();
        expect(subcategories).toBeDefined();
        expect(subcategories.length).toBe(0);
    });
});