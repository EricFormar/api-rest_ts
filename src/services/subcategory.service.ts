import SubCategory from "../database/models/subcategory";
import { BadRequestError, NotFoundError } from "../errors/HttpError";
import { ISubCategory } from "../interfaces/ISubcategory";
import { ISubCategoryRepository } from "../interfaces/ISubCategoryRepository";
import { SubCategoryTestingRepository } from "../tests/repositories/SubCategoryTestingrRepository";

export class SubCategoryService {
   constructor(
      private subCategoryRepsitory: SubCategoryTestingRepository
   ){}
   // Get all subCategories
   async getAll() {
      return await this.subCategoryRepsitory.getAll()
   }
   // Get subCategory by id
   async getById(id: number){
      if(typeof id !== "number") throw new BadRequestError("Bad ID")
      const subcategory = await this.subCategoryRepsitory.getById(id);
      if(!subcategory) throw new NotFoundError('Not found');
      return subcategory
   }
   // Create subCategory
   async create(data : Omit<ISubCategory,'id' | 'createdAt' | 'updatedAt'>){
      if(!data.name || !data.image) throw new BadRequestError("Missing data");
      const newSubCategory = this.subCategoryRepsitory.create(data);
      return newSubCategory
   }
   // Update subCategory
   async update(data : Omit<Partial<ISubCategory>,'createdAt'|'updatedAt'>){
      if(!data) throw new BadRequestError("Missing payload")
      if(!data.id) throw new BadRequestError("ID required");
      const subcategoryToUpdated = await this.getById(data.id!)
      if(!subcategoryToUpdated) throw new NotFoundError("Subcategory not found")
      const subcategoryUpdated = this.subCategoryRepsitory.update(data);
      
      return subcategoryUpdated
   }
   // Delete subCategory 
   async delete(id : number){
      if(!id) throw new BadRequestError("ID required");
      const subcategoryToDeleted = await this.getById(id!)
      if(!subcategoryToDeleted) throw new NotFoundError("Subcategory not found")
      return this.subCategoryRepsitory.delete(id)
   }
   
}