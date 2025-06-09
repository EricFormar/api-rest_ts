'use strict';

import { QueryInterface, Sequelize } from "sequelize";
import { BrandAttributes } from "../models/brand";
import brandsJSON from '../../data/brands.json';

/** @type {import('sequelize-cli').Migration} */

export = {
  async up (queryInterface : QueryInterface, Sequelize : Sequelize) {
    const brands = brandsJSON.map((brand : BrandAttributes) => ({
      name: brand.name,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Brands', brands, {});
  },

  async down (queryInterface : QueryInterface, Sequelize : Sequelize) {
    await queryInterface.bulkDelete('Brands', [], {});
  }
};
