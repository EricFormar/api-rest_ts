import Category from "../database/models/category";

export class CategoryService {

   // Get all categories
   async getAllCategories() {
      const categories = await Category.findAll();
      return categories;
   }
   // Get category by id
   async getCategoryById(id: number) {
      const category = await Category.findByPk(id);
      return category;
   }
   // Create category

   // Update category

   // Delete category 
   
}