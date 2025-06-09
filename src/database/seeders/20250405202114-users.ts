"use strict";

import { QueryInterface, Sequelize } from "sequelize";
import bcrypt from 'bcrypt';
import { INIT_PASSWORD } from "../../env";

const password = INIT_PASSWORD || '123123'

/** @type {import('sequelize-cli').Migration} */

export = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
  
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: 'Admin',
          surname: 'MercadoLiebre',
          email: 'admin@gmail.com',
          password: bcrypt.hashSync(password, 10),
          token: null,
          validated: true,
          lock: false,
          rolId: 1,
          createdAt : new Date,
          updatedAt : new Date
        },
        {
          name: 'User',
          surname: 'MercadoLiebre',
          email: 'user@gmail.com',
          password: bcrypt.hashSync(password, 10),
          token: null,
          validated: true,
          lock: false,
          rolId: 2,
          createdAt : new Date,
          updatedAt : new Date
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
  
    await queryInterface.bulkDelete('Users', [], {});

  },
};