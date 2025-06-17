import { afterEach, beforeEach, describe, expect, it } from "vitest";
import migrationRol from "../../database/migrations/20250607141656-rol";
import migration from "../../database/migrations/20250607141756-user";
import seedRol from "../../database/seeders/20250405202114-roles";
import seed from "../../database/seeders/20250405202114-users";
import sequelizeConnection from "../../database/connection";
import { DataTypesTest, queryInterface } from "../../database/setup";
import User from "../../database/models/user";

describe("Seed User", () => {
    beforeEach(async () => {
        await migrationRol.up(queryInterface, DataTypesTest);
        await seedRol.up(queryInterface, sequelizeConnection);
        await migration.up(queryInterface, DataTypesTest);
        await seed.up(queryInterface, sequelizeConnection);
    });

    afterEach(async () => {
        await migration.down(queryInterface, DataTypesTest);
        await migrationRol.down(queryInterface, DataTypesTest);
    })

    it("should return a brand", async () => {
        const users = await User.findAll();
        expect(users).toBeDefined();
        expect(users.length).toBeGreaterThan(0);
    });

    it("should delete all users", async () => {
        await seed.down(queryInterface, sequelizeConnection);
        const users = await User.findAll();
        expect(users).toBeDefined();
        expect(users.length).toBe(0);
    })
})