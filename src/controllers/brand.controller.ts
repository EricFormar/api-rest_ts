import { NextFunction, Request, Response } from "express";
import { BrandService } from "../services/brand.service";

export class BrandController {

    private brandService : BrandService;

    constructor() {
        this.brandService = new BrandService();
    }

    // Get all brands

    // Get brand by id

    // Create brand

    // Update brand
    
    // Delete brand
}