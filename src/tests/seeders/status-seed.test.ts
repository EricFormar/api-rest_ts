import { afterEach, beforeEach, describe, expect, it } from "vitest";
import migration from "../../database/migrations/20250607142616-status";
import seed from "../../database/seeders/20250513233244-statuses";
import sequelizeConnection from "../../database/connection";
import { DataTypesTest, queryInterface } from "../../database/setup";
import Status from "../../database/models/status";

describe("Seed Status", () => {
    beforeEach(async () => {
        await migration.up(queryInterface, DataTypesTest);
        await seed.up(queryInterface, sequelizeConnection);
    });

    afterEach(async () => {
        await migration.down(queryInterface, DataTypesTest);
    })
    it("should return a status", async () => {
        
        const statuses = await Status.findAll();
        expect(statuses).toBeDefined();
        expect(statuses.length).toBeGreaterThan(0);

    });

    it("should delete all statuses", async () => {
        await seed.down(queryInterface, sequelizeConnection);

        const statuses = await Status.findAll();
        expect(statuses).toBeDefined();
        expect(statuses.length).toBe(0);

    })
})