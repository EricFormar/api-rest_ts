'use strict';

import { QueryInterface, Sequelize } from "sequelize";
import productsJSON from '../../data/products.json';
import { ICategory } from "../../interfaces/ICategory";
import { ISubCategory } from "../../interfaces/ISubcategory";
import { IBrand } from "../../interfaces/IBrand";

/** @type {import('sequelize-cli').Migration} */
export = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    // Get all categories, subcategories and brands from the database

    const [categories] = await queryInterface.sequelize.query(
      'SELECT id, name FROM Categories',
    ) as unknown as [ICategory[], []];

    const [subcategories] = await queryInterface.sequelize.query(
      'SELECT id, name FROM Subcategories'
    ) as unknown as [ISubCategory[], []];

    const [brands] = await queryInterface.sequelize.query(
      'SELECT id, name FROM Brands',
    ) as unknown as [IBrand[], []];

    const products = productsJSON.map(product => {
      const category = categories.find(cat => cat.name === product.category);
      const subcategory = subcategories.find(sub => sub.name === product.subcategory);
      const brand = brands.find(b => product.name.includes(b.name));
      
      return {
        name: product.name,
        price: product.price,
        discount: product.discount || 0,
        description: product.description,
        sectionId: product.section == "visited" ? 1 : 2,
        categoryId: category?.id,
        subcategoryId: subcategory?.id,
        brandId: brand?.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface : QueryInterface, Sequelize : Sequelize) {
    await queryInterface.bulkDelete('Products', [], {});
  }
};
