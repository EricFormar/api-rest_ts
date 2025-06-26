import { beforeEach, describe, expect, it } from "vitest";
import { ProductService } from "../../services/product.service";
import { getProductMock } from "../mocks/product.mock";
import { BadRequestError, NotFoundError } from "../../errors/HttpError";
import { ProductTestingRespository } from "../repositories/ProductTestingRespository";

let productService: ProductService;
let mockProductRepository: ProductTestingRespository;

// `beforeEach` es ideal para asegurar un estado limpio antes de cada test.
beforeEach(async () => {
  // Resetear los mocks antes de cada test para que no haya interferencias entre ellos.
  mockProductRepository = new ProductTestingRespository([
    getProductMock({ id: 1, name: "any product", price: 100 }),
    getProductMock({ id: 2, name: "other product", price: 200 }),
  ]);
  productService = new ProductService(mockProductRepository);
});

// --- Test Suite para getAllProducts ---
describe("ProductService.getAllProducts", () => {
  it("should return all products", async () => {
    const result = await productService.getAllProducts();

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].name).toBe("any product");
    expect(result[1].name).toBe("other product");
  });

  it("should return an empty array if no products are found", async () => {
    productService = new ProductService(new ProductTestingRespository([]));
    const result = await productService.getAllProducts();

    expect(result).toEqual([]);
  });
});

// --- Test Suite para getProductById ---
describe("ProductService.getProductById", () => {
  it("should return a product by id", async () => {
    const result = await productService.getProductById(1);

    expect(result).toBeDefined();
    expect(result.name).toBe("any product");
  });

  it("should return null if product not found", async () => {
    await expect(productService.getProductById(3)).rejects.toThrow(
      NotFoundError
    );
  });
});

// --- Test Suite para createProduct ---
describe("ProductService.createProduct", () => {
  it("should create a product", async () => {
    const data = getProductMock({ id: 3, name: "new product", price: 100 });
    const newProduct = await productService.createProduct(data);

    expect(newProduct).toBeDefined();
    expect(newProduct).toEqual(data);
  });

  it("should throw an error if product data is missing", async () => {
    await expect(
      productService.createProduct({
        name: "",
        price: 100,
        description: "",
        discount: 0,
        subcategoryId: 1,
        sectionId: 1,
        brandId: 1,
        categoryId: 1,
      })
    ).rejects.toThrow(BadRequestError);
  });
});

describe("ProductService.updateProduct", () => {
  it("should update a product", async () => {
    const productToUpdate = getProductMock({
      id: 1,
      name: "update product",
      price: 200,
    });
    const productUpdated = await productService.updateProduct(productToUpdate);

    expect(productUpdated).toBeDefined();
    expect(productUpdated.name).toBe(productToUpdate.name);
  });

  it("should return reject if product to update not found", async () => {
    const productToUpdate = getProductMock({
      id: 1000,
      name: "update product",
      price: 200,
    });

    await expect(productService.updateProduct(productToUpdate)).rejects.toThrow(
      NotFoundError
    );
  });
});

describe("ProductService.deleteProduct", () => {
  it("should delete a product", async () => {
    const result = await productService.deleteProduct(1);

    expect(result).toBe(true);
  });

  it("should return null if product to delete not found", async () => {
    await expect(productService.deleteProduct(100)).rejects.toThrow(
      NotFoundError
    );
  });
});

describe("ProductService.searchProducts", () => {
  it("should search for products", async () => {
    const products = [
      getProductMock({ id: 1, name: "any product", price: 100 }),
      getProductMock({ id: 2, name: "other product", price: 200 }),
      getProductMock({ id: 3, name: "other product", price: 300 }),
    ];

    mockProductRepository = new ProductTestingRespository(products);
    productService = new ProductService(mockProductRepository);
    const result = await productService.searchProducts({
      name: "other product",
    });

    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result).toEqual([products[1], products[2]]);
  });

  it("should return an empty array if no products are found", async () => {
    mockProductRepository = new ProductTestingRespository([]);
    productService = new ProductService(mockProductRepository);
    const result = await productService.searchProducts({
      name: "other product",
    });

    expect(result).toEqual([]);
  });
});
