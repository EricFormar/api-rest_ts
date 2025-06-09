'use strict';

import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */

export = {
  async up (queryInterface: QueryInterface, Sequelize : Sequelize) {
    const sections = [
      {
        name: 'Novedades',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ofertas',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Sections', sections, {});
  },

  async down (queryInterface : QueryInterface, Sequelize : Sequelize) {
    await queryInterface.bulkDelete('Sections', [], {});
  }
};
