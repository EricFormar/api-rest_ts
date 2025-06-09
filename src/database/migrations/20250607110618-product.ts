import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */

export = {
  async up(queryInterface: QueryInterface, Sequelize:typeof DataTypes) { 
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull : false,
        type: Sequelize.STRING
      },
      price: {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      discount: {
        allowNull : true,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull : false,
        type: Sequelize.TEXT
      },
      brandId : {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Brands'
          },
          key: 'id'
        },
      },
      sectionId : {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Sections'
          },
          key: 'id'
        },
      },
      categoryId : {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Categories'
          },
          key: 'id'
        }
      },
      subcategoryId : {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Subcategories'
          },
          key: 'id'
        },
      },  
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt : {
        allowNull: true,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.dropTable('Products');
  }
};