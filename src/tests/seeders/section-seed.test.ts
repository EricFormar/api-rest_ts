import { afterEach, beforeEach, describe, expect, it } from "vitest";
import seed from "../../database/seeders/20250403165301-sections";
import migration from "../../database/migrations/20250607110120-section";
import { DataTypesTest, queryInterface } from "../../database/setup";
import sequelizeConnection from "../../database/connection";
import Section from "../../database/models/section";

describe("Section Seed", () => {

    beforeEach(async () => {
        await migration.up(queryInterface, DataTypesTest);
        await seed.up(queryInterface, sequelizeConnection);
    });

    afterEach(async () => {
        await migration.down(queryInterface, DataTypesTest);
    })

    it("should return a section", async () => {
        const sections = await Section.findAll();
        expect(sections).toBeDefined();
        expect(sections.length).toBeGreaterThan(0);
    });

    it("should delete all sections", async () => {
        await seed.down(queryInterface, sequelizeConnection);
        const sections = await Section.findAll();
        expect(sections).toBeDefined();
        expect(sections.length).toBe(0);
    });
});