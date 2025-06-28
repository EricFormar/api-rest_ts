'use strict';

import { QueryInterface, Sequelize } from "sequelize";
import categoriesJSON from "../../data/categories.json";
import { ICategory } from "../../interfaces/ICategory";
import { ISubCategory } from "../../interfaces/ISubcategory";

/** @type {import('sequelize-cli').Migration} */

export = {
  async up (queryInterface: QueryInterface, Sequelize : Sequelize) {
    
    const result  = await queryInterface.sequelize.query(
      'SELECT id, name FROM Categories'
    ) as unknown as [ICategory[],[]];
    const categories : ICategory[] = result[0];    
    const subcategories : Partial<ISubCategory>[] = [];
    
    categoriesJSON.forEach(category => {
      // Find the corresponding category ID
      const dbCategory = categories.find((c : ICategory) => c.name === category.name);
      
      if (dbCategory && category.subcategories) {
        category.subcategories.forEach(subcategory => {
          return subcategories.push({
            name: subcategory,
            image : null,
            categoryId: dbCategory.id,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
      }
    });

    await queryInterface.bulkInsert('Subcategories', subcategories, {});
  },

  async down(queryInterface : QueryInterface, Sequelize : Sequelize) {
    await queryInterface.bulkDelete('Subcategories', [], {});
  }
};
