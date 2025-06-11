import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {

    private productService : ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    // Get all products

    // Get product by id

    // Create product

    // Update product
    
    // Delete product
}