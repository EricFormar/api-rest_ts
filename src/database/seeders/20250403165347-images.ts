'use strict';

import { QueryInterface, Sequelize } from "sequelize";
import { ImageAttributes } from "../models/image";
import productsData from "../../data/products"

/** @type {import('sequelize-cli').Migration} */

export = {
  async up (queryInterface : QueryInterface, Sequelize: Sequelize) {
  
    const images : Omit<ImageAttributes, 'id'>[] = [];
    
    productsData.forEach(product => {
          images.push({
            file: product.image,
            productId: product.id,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    });

    await queryInterface.bulkInsert('Images', images, {});
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkDelete('Images', [], {});
  }
};
