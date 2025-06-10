import { NextFunction, Request, Response } from "express";
import { SubCategoryService } from "../services/subcategory.service";

export class SubCategoryController {

    private subcategoryService : SubCategoryService;

    constructor() {
        this.subcategoryService = new SubCategoryService();
    }

    // Get all subcategorys

    // Get subcategory by id

    // Create subcategory

    // Update subcategory
    
    // Delete subcategory
}