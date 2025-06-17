import { afterEach, beforeEach, describe, expect, it } from "vitest";
import migration from "../../database/migrations/20250607110250-brand";
import seed from "../../database/seeders/20250403165300-brands";
import sequelizeConnection from "../../database/connection";
import { DataTypesTest, queryInterface } from "../../database/setup";
import Brand from "../../database/models/brand";

describe("Seed Brand", () => {
    beforeEach(async () => {
        await migration.up(queryInterface, DataTypesTest);
        await seed.up(queryInterface, sequelizeConnection);
    });

    afterEach(async () => {
        await migration.down(queryInterface, DataTypesTest);
    })
    it("should return a brand", async () => {
        
        const brands = await Brand.findAll();
        expect(brands).toBeDefined();
        expect(brands.length).toBeGreaterThan(0);

    });

    it("should delete all brands", async () => {
        await seed.down(queryInterface, sequelizeConnection);

        const brands = await Brand.findAll();
        expect(brands).toBeDefined();
        expect(brands.length).toBe(0);

    })
})