import Category, { CategoryAttributes } from "../database/models/category";
import { BadRequestError, NotFoundError } from "../errors/HttpError";
import { CategoryPayload } from "../interfaces/Category.interface";
import { getRandomNumber } from "../utils/getRandomNumber";

export class CategoryService {

   // Get all categories
   async getAllCategories() {
      const categories = await Category.findAll();
      return categories;
   }
   // Get category by id
   async getCategoryById(id: number) {

      if(!id) {
         throw new BadRequestError("Category id is required");
      }

      if(typeof id !== "number") {
         throw new BadRequestError("Category id must be a number");
      }

      const category = await Category.findByPk(id);
      if(!category) {
         throw new NotFoundError("Category not found");
      }
      return category;
   }

   // Find category by query string
   async findCategory(queryString: Omit<Partial<CategoryAttributes>, "id" | "createdAt" | "updatedAt" | "deletedAt">) {

      if(Object.keys(queryString).length === 0) {
         throw new BadRequestError("Query string is empty");
      };

      const query = {
         where : queryString
      };
      const category = await Category.findOne(query);

      if(!category) {
         throw new NotFoundError("Category not found");
      }
      return category;
   }
   // Create category
   async createCategory(payload: CategoryPayload) {
      
      if(!payload.name || !payload.image) {
         throw new BadRequestError("Category name and image are required");
      }

      const categoryData = {
            ...payload,
            id : getRandomNumber(1,100),
            createdAt : new Date,
            updatedAt : new Date,
         }
         const category = await Category.create(categoryData);
         return category;
   }
   // Update category
   async updateCategory(id: number, payload: Partial<CategoryPayload>) {
      if(!id) {
         throw new BadRequestError("Category id is required");
      }
      

      if(Object.keys(payload).length === 0) {
         throw new BadRequestError("Category payload is empty");
      }

      const category = await Category.findByPk(id);
      if(!category) {
         throw new NotFoundError("Category not found");
      }

      await category.update(payload);
      return category;
   };

   // Delete category
   async deleteCategory(id: number) : Promise<void> {
      if(!id) {
         throw new BadRequestError("Category id is required");
      }

      const category = await Category.findByPk(id);
      if(!category) {
         throw new NotFoundError("Category not found");
      }

     await category.destroy();

   }
}