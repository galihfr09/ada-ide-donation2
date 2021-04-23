'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DonationTransactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      donatorName: {
        type: Sequelize.STRING
      },
      donatorEmail: {
        type: Sequelize.STRING
      },
      donatorNumber: {
        type: Sequelize.STRING
      },
      isAnonym: {
        type: Sequelize.BOOLEAN
      },
      message: {
        type: Sequelize.STRING
      },
      paymentStatus: {
        type: Sequelize.STRING
      },
      channel: {
        type: Sequelize.STRING
      },
      donationAmount: {
        type: Sequelize.BIGINT
      },
      uniqueDigit: {
        type: Sequelize.INTEGER
      },
      donationId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DonationTransactions');
  }
};