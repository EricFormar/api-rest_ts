import { NextFunction, Request, Response } from "express";
import { SectionService } from "../services/section.service";

export class SectionController {

    private sectionService : SectionService;

    constructor() {
        this.sectionService = new SectionService();
    }

    // Get all sections

    // Get section by id

    // Create section

    // Update section
    
    // Delete section
}