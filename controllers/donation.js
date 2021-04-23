const uuidv4 = require('uuid').v4
const Donation = require('../models').Donation;
const DonationNews = require('../models').DonationNews;
const DonationTransaction = require('../models').DonationTransaction;

module.exports = {
    list(req, res) {
      return Donation
        .findAll({
          order: [
            ['createdAt', 'DESC'],
          ],
        })
        .then((donations) => res.status(200).json({status: 200, data: donations}))
        .catch((error) => { res.status(400).json(error); });
    },

    listByName(req, res) {
        return Donation
          .findAll({
            where: {
              name: req.body.name
            },
            order: [
              ['createdAt', 'DESC'],
            ],
          })
          .then((donations) => res.status(200).json({status: 200, data: donations}))
          .catch((error) => { res.status(400).json(error); });
      },
        
    getById(req, res) {
      return Donation
        .findByPk(req.body.id, {
          include: [
          {
            model: DonationNews,
          },
          {
            model: DonationTransaction,
          }
        ]})
        .then((donation) => {
          if (!donation) {
            return res.status(404).json({
              message: 'Donation Not Found',
            });
          }
          return res.status(200).json({status: 200, data: donations});
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json(error);
        });
    },

    add(req, res) {
      return Donation
        .create({
          id: uuidv4(),
          name: req.body.name,
          description: req.body.description,
          targetDonation: req.body.targetDonation,
        })
        .then((donation) => res.status(201).json({status: 201, data: donations}))
        .catch((error) => res.status(400).json(error));
    },

    update(req, res) {
      return Donation
        .findByPk(req.body.id)
        .then(donation => {
          if (!donation) {
            return res.status(404).json({
              message: 'Donation Not Found',
            });
          }
          return donation
            .update({
              name: req.body.name || donation.name,
              description: req.body.description || donation.description,
              targetDonation: req.body.targetDonation || donation.targetDonation,
              currentDonation: req.body.currentDonation || donation.currentDonation
            })
            .then((donation) => res.status(200).json({status: 200, data: donations}))
            .catch((error) => res.status(400).json(error));
        })
        .catch((error) => res.status(400).json(error));
    },

    delete(req, res) {
      return Donation
        .findByPk(req.body.id)
        .then(donation => {
          if (!donation) {
            return res.status(400).json({
              message: 'Donation Not Found',
            });
          }
          return donation
            .destroy()
            .then(() => res.status(204).json({
              message: 'Donation deleted successfully'
            }))
            .catch((error) => res.status(400).json(error));
        })
        .catch((error) => res.status(400).json(error));
    },

    donate(req, res) {
      return Donation
        .findByPk(req.body.id)
        .then(donation => {
          if (!donation) {
            return res.status(404).json({
              message: 'Donation Not Found',
            });
          }
          return donation
            .increment({
              currentDonation: req.body.donationAmount
            })
            .then(() => res.status(200).json({message: 'Donation success!'}))
            .catch((error) => res.status(400).json(error));
        })
        .catch((error) => res.status(400).json(error));
    }
};