'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('Donations', 'description', {
      type: Sequelize.TEXT
    });
    await queryInterface.changeColumn('DonationNews', 'body', {
      type: Sequelize.TEXT
    });
    await queryInterface.changeColumn('DonationTransactions', 'message', {
      type: Sequelize.TEXT
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('Donations', 'description', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('DonationNews', 'body', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('DonationTransactions', 'message', {
      type: Sequelize.STRING
    });
  }
};
