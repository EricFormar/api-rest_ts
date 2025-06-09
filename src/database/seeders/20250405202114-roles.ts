"use strict";

import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */

export = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
  
    await queryInterface.bulkInsert(
      "Rols",
      [
        {
          name: "Admin",
          createdAt : new Date,
          updatedAt : new Date
        },
        {
          name: "User",
          createdAt : new Date,
          updatedAt : new Date
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
  
    await queryInterface.bulkDelete('Rols', [], {});

  },
};