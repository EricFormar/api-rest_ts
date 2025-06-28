'use strict';

import { QueryInterface, Sequelize } from "sequelize";
import productsJSON from "../../data/products.json"
import { IImage } from "../../interfaces/IImage";

/** @type {import('sequelize-cli').Migration} */

export = {
  async up (queryInterface : QueryInterface, Sequelize: Sequelize) {
  
    const images : Omit<IImage, 'id'>[] = [];
    
    productsJSON.forEach(product => {
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
