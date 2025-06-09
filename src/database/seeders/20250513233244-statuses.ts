"use strict";

import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */

export = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
  
    await queryInterface.bulkInsert(
      "Statuses",
      [
        {
          name: "Pending",
          createdAt : new Date,
          updatedAt : new Date
        },
        {
          name: "Completed",
          createdAt : new Date,
          updatedAt : new Date
        },
        {
          name: "Cancelled",
          createdAt : new Date,
          updatedAt : new Date
        },
      ],
      {}
    );
  },

  async down(queryInterface : QueryInterface, Sequelize : Sequelize) {
  
    await queryInterface.bulkDelete('Statuses', [], {});

  },
};'use strict';