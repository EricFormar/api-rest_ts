import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CategoryService } from "../../services/category.service";
import migration from "../../database/migrations/20250607105742-category";
import { DataTypesTest, queryInterface } from "../../database/setup";
import { QueryInterface } from "sequelize";
import { getCategoryMock } from "../mocks/category.mock";

describe("Category Service", () => {
    const categoryService = new CategoryService();

    beforeEach  (async () => {
        await migration.up(queryInterface as QueryInterface, DataTypesTest);
    })

    afterEach (async () => {
        await migration.down(queryInterface as QueryInterface, DataTypesTest);
    })

    it("should get all categories", async () => {
        await getCategoryMock({
            id : 1,
            name : "Test Category"
        });
        const categories = await categoryService.getAllCategories();
        expect(categories.length).toBeGreaterThan(0);
    });

    it("should get category by id", async () => {
        await getCategoryMock({
            id : 1,
            name : "Test Category"
        });
        const category = await categoryService.getCategoryById(1);
        expect(category).toBeDefined();
    })
})