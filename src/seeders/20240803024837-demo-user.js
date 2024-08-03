'use strict';

const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Hashea la contraseña
      const hashedPassword = await bcrypt.hash('1234', saltRounds);

      await queryInterface.bulkInsert('Users', [{
        fullName: 'Byron Hernandez',
        email: 'byronh@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
