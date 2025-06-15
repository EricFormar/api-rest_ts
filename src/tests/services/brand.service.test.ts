import { describe, expect, it, afterEach, beforeEach, vi } from "vitest";
import { BrandModelRequest, BrandService } from "../../services/brand.service";
import migration from "../../database/migrations/20250607110250-brand";
import { getBrandMock } from "../mocks/brand.mock";
import { DataTypesTest, queryInterface } from "../setup";
import { QueryInterface } from "sequelize";
import Brand from "../../database/models/brand";
import { BadRequestError, NotFoundError } from "../../errors/HttpError";
import { getRandomNumber } from "../../utils/getRandomNumber";

describe("brand.service", () => {
    const brandService = new BrandService();
    const dbConnectionError = new Error("Connection timed out to database");

    beforeEach(async () => {
        await migration.up(queryInterface as QueryInterface, DataTypesTest);
        vi.restoreAllMocks();
    });

    afterEach(async () => {
        await migration.down(queryInterface as QueryInterface, DataTypesTest);
    });

    // Obtener todos los brands
    it("getAll", async () => {
        await getBrandMock({
            id : 1,
            name : "Test Brand"
        });
        const brands = await brandService.getAllBrands();
        expect(brands.length).toBeGreaterThan(0);
    })

    // Checar errores al obtener todos los brands
    it("getAllErrors", async () => {
        // Mockea el método findAll del modelo Brand para que lance un error
        vi.spyOn(Brand, "findAll").mockRejectedValue(dbConnectionError);
        await expect(brandService.getAllBrands()).rejects.toThrow(dbConnectionError.message);
        await expect(brandService.getAllBrands()).rejects.toHaveProperty("message", dbConnectionError.message);
    })

    // Obtener brand por id
    it("getById", async () => {
        await getBrandMock({
            id : 1,
            name : "Test Brand"
        });
        const brand = await brandService.getBrandById(1);
        expect(brand).toBeDefined();
    })

    // Checar errores al obtener brand por id
    it("getByIdErrors", async () => {
        await getBrandMock({
            id: 1,
            name : "Test Brand"
        });
        await expect(brandService.getBrandById(2)).rejects.toThrow(NotFoundError);
    })

    // Crear brand
    it("create", async () => {
        const data: BrandModelRequest = {
            name: "Test Brand",
            image: "test.jpg",
        }
        const brand = await brandService.createBrand(data as Brand);
        expect(brand).toBeDefined();
        expect(brand.name).toBe("Test Brand");
        expect(brand.image).toBe("test.jpg");
    })

    // Checar errores al crear brand
    it("createErrors", async () => {
        // Mockea el método create del modelo Brand para que lance un error
        const data = {
            name: "",
            image: "",
        }
        await expect(brandService.createBrand(data as Brand)).rejects.toThrow(BadRequestError);
    })

    // Actualizar brand
    it("update", async () => {
        await getBrandMock({
            id : 1,
            name : "Test Brand"
        });
        const data: BrandModelRequest = {
            name: "Test Brand updated",
            image: "test.jpg",
        }
        const response = await brandService.updateBrand(1, data as Brand);
        expect(response).toBeDefined();
        expect(response[0]).toBe(1);
    })

    // Checar errores al actualizar brand
    it("updateErrors", async () => {
        await getBrandMock({
            id : 1,
            name : "Test Brand"
        });
        const badData = {
            name: "",
            image: "",
        }
        await expect(brandService.updateBrand(1, badData as Brand)).rejects.toThrow(BadRequestError);

        const dataCorrect = {
            name: "Test Brand updated",
            image: "test.jpg",
        }
        await expect(brandService.updateBrand(2, dataCorrect as Brand)).rejects.toThrow(NotFoundError);
    })

    // Eliminar brand
    it("delete", async () => {
        await getBrandMock({
            id : 1,
            name : "Test Brand"
        });
        const response = await brandService.deleteBrand(1);
        expect(response).toBeDefined();
        expect(response).toBe(1);
    })

    // Checar errores al eliminar brand
    it("deleteErrors", async () => {
        await getBrandMock({
            id : 1,
            name : "Test Brand"
        });
        await expect(brandService.deleteBrand(2)).rejects.toThrow(NotFoundError);
    })
})