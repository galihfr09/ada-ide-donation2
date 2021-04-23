'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DonationTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Donation, {
        foreignKey: 'donationId'
      })
    }
  };
  DonationTransaction.init({
    donatorName: DataTypes.STRING,
    donatorEmail: DataTypes.STRING,
    donatorNumber: DataTypes.STRING,
    isAnonym: DataTypes.BOOLEAN,
    message: DataTypes.TEXT,
    paymentStatus: DataTypes.STRING,
    channel: DataTypes.STRING,
    donationAmount: DataTypes.BIGINT,
    uniqueDigit: DataTypes.INTEGER,
    donationId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DonationTransaction',
  });
  return DonationTransaction;
};