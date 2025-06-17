import { afterEach, beforeEach, describe, expect, it } from "vitest";
import migration from "../../database/migrations/20250607141656-rol";
import seed from "../../database/seeders/20250405202114-roles";
import sequelizeConnection from "../../database/connection";
import { DataTypesTest, queryInterface } from "../../database/setup";
import Rol from "../../database/models/rol";

describe("Seed Rol", () => {
    beforeEach(async () => {
        await migration.up(queryInterface, DataTypesTest);
        await seed.up(queryInterface, sequelizeConnection);
    });

    afterEach(async () => {
        await migration.down(queryInterface, DataTypesTest);
    })

    it("should return a brand", async () => {
        const roles = await Rol.findAll();
        expect(roles).toBeDefined();
        expect(roles.length).toBeGreaterThan(0);
    });

    it("should delete all roles", async () => {
        await seed.down(queryInterface, sequelizeConnection);
        const roles = await Rol.findAll();
        expect(roles).toBeDefined();
        expect(roles.length).toBe(0);
    })
})