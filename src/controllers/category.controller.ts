import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";

export class CategoryController {

    private categoryService : CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    // Get all categories

    // Get category by id

    // Create category

    // Update category
    
    // Delete category
}