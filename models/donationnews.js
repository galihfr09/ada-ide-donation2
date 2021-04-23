'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DonationNews extends Model {
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
  DonationNews.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    donationId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DonationNews',
  });
  return DonationNews;
};