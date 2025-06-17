'use strict';

import { QueryInterface, Sequelize } from "sequelize";
import { CategoryAttributes } from "../models/category";
import { SubCategoryAttributes } from "../models/subcategory";
import categoriesData from "../../data/categories";

/** @type {import('sequelize-cli').Migration} */

export = {
  async up (queryInterface: QueryInterface, Sequelize : Sequelize) {
    
    const result  = await queryInterface.sequelize.query(
      'SELECT id, name FROM Categories'
    ) as unknown as [CategoryAttributes[],[]];
    const categories : CategoryAttributes[] = result[0];    
    const subcategories : Partial<SubCategoryAttributes>[] = [];
    
    categoriesData.forEach(category => {
      // Find the corresponding category ID
      const dbCategory = categories.find((c : CategoryAttributes) => c.name === category.name);
      
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
