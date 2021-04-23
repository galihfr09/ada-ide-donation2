'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.DonationNews, {
        foreignKey: 'donationId'
      });
      this.hasMany(models.DonationTransaction, {
        foreignKey: 'donationId'
      });
    }
  };
  Donation.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    targetDonation: DataTypes.BIGINT,
    currentDonation: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Donation',
  });
  return Donation;
};