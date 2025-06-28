import { afterEach, beforeEach, describe, expect, it } from "vitest";
import migration from "../../../database/migrations/20250607105742-category";
import seed from "../../../database/seeders/20250403165300-categories";
import { queryInterface, DataTypesTest } from "../../../database/setup";
import sequelizeConnection from "../../../database/connection";
import Category from "../../../database/models/category";

describe("Seed Category", () => {
    beforeEach(async () => {
        await migration.up(queryInterface, DataTypesTest);
        await seed.up(queryInterface, sequelizeConnection);
    });

    afterEach(async () => {
        await migration.down(queryInterface, DataTypesTest);
    });

    it("should return a category", async () => {
        const categories = Category.findAll();
        expect(categories).toBeDefined();
        expect((await categories).length).toBeGreaterThan(0);
    });

    it("should delete all categories", async () => {
        await seed.down(queryInterface, sequelizeConnection);
        const categories = Category.findAll();
        expect(categories).toBeDefined();
        expect((await categories).length).toBe(0);
    });
})