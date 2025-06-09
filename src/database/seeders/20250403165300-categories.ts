'use strict';

import { QueryInterface, Sequelize } from "sequelize";
import categoriesData from "../../data/categories";

/** @type {import('sequelize-cli').Migration} */

export = {
  async up (queryInterface: QueryInterface, Sequelize : Sequelize) {
    const categories = categoriesData.map(category => ({
      name: category.name,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Categories', categories, {});
  },

  async down (queryInterface : QueryInterface, Sequelize : Sequelize) {
    await queryInterface.bulkDelete('Categories', [], {});
  }
};
