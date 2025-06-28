import { beforeEach, describe, expect, it } from "vitest";
import { SectionService } from "../../services/section.service";
import { getSectionMock } from "../mocks/section.mock";
import { SectionTestingRepository } from "../repositories/SectionTestingRepository";
import { BadRequestError, NotFoundError } from "../../errors/HttpError";

const sections = [
  getSectionMock({
    id: 1,
  }),
  getSectionMock({
    id: 2,
    name: "other section",
  }),
];

let sectionService: SectionService;
let mockSectionRespository: SectionTestingRepository;

beforeEach(async () => {
  mockSectionRespository = new SectionTestingRepository(sections);
  sectionService = new SectionService(mockSectionRespository);
});

describe("SectionService.getAll", () => {
  it("should return all sections", async () => {
    const result = await sectionService.getAll();
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result).toEqual(sections);
  });

  it("should return an empty array if no sections are found", async () => {
    sectionService = new SectionService(new SectionTestingRepository([]));
    const result = await sectionService.getAll();

    expect(result).toEqual([]);
  });
});

describe("SectionService.getById", () => {
  // Obtener section por id
  it("should return a section by id", async () => {
    const result = await sectionService.getById(1);

    expect(result).toBeDefined();
    expect(result).toEqual(sections[0]);
  });

  // Checar errores al obtener section por id
  it("should return error if section not found", async () => {
    await expect(sectionService.getById(3)).rejects.toThrow(NotFoundError);
  });

  it("should return error if bad section id", async () => {
    await expect(sectionService.getById("a" as any)).rejects.toThrow(
      BadRequestError
    );
  });
});

describe("SectionService.create", () => {
  it("should create a section", async () => {
    const data = getSectionMock({
      name: "new section",
    });
    const newBrand = await sectionService.create(data);

    expect(newBrand).toBeDefined();
    expect(newBrand).toEqual(data);
  });
  // Checar errores al crear section
  it("should throw an error if section data is missing", async () => {
    await expect(
      sectionService.create({
        name: "",
      })
    ).rejects.toThrow(BadRequestError);
  });
});


describe("ProductService.update", () => {
    it("should update a section", async () => {
      const productToUpdate = getSectionMock({
        id: 1,
        name: "update section",
      });
      const sectionUpdated = await sectionService.update(productToUpdate);
  
      expect(sectionUpdated).toBeDefined();
      expect(sectionUpdated?.name).toBe(productToUpdate.name);
    });
  
    it("should return reject if section to update not found", async () => {
      const sectionToUpdate = getSectionMock({
        id: 1000,
        name: "update section",
      });
  
      await expect(sectionService.update(sectionToUpdate)).rejects.toThrow(
        NotFoundError
      );
    });
  });
  
  describe("SectionService.delete", () => {
    it("should delete a section", async () => {
      const result = await sectionService.delete(1);
  
      expect(result).toBe(true);
    });
  
    it("should return null if section to delete not found", async () => {
      await expect(sectionService.delete(100)).rejects.toThrow(
        NotFoundError
      );
    });
  });
