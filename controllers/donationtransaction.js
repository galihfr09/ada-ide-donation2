const uuidv4 = require('uuid').v4
const Donation = require('../models').Donation;
const DonationTransaction = require('../models').DonationTransaction;

module.exports = {
    list(req, res) {
      return DonationTransaction
        .findAll({
          order: [
            ['createdAt', 'DESC'],
          ],
        })
        .then((donationTransactions) => res.status(200).json({status: 200, data: donationTransactions}))
        .catch((error) => { res.status(400).json(error); });
    },

    listByDonationId(req, res) {
        return DonationTransaction
          .findAll({
            where: {
              donationId: req.body.id
            },
            order: [
              ['createdAt', 'DESC'],
            ],
          })
          .then((donationTransactions) => res.status(200).json({status: 200, data: donationTransactions}))
          .catch((error) => { res.status(400).json(error); });
      },
      
    getById(req, res) {
        return DonationTransaction
        .findByPk(req.body.id)
        .then((donationTransactions) => {
            if (!donationTransactions) {
            return res.status(404).json({
                message: 'Donation Transactions Not Found',
            });
            }
            return res.status(200).json({status: 201, data: donationTransactions});
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(error);
        });
    },

    add(req, res) {
        return DonationTransaction
        .create({
            id              : uuidv4(),
            donatorName     : req.body.donatorName,
            donatorEmail    : req.body.donatorEmail,
            donatorNumber   : req.body.donatorNumber,
            isAnonym        : req.body.isAnonym,
            message         : req.body.message,
            paymentStatus   : 'waiting',
            channel         : req.body.channel,
            donationAmount  : req.body.donationAmount,
            uniqueDigit     : _randomDigit(1,99),
            donationId      : req.body.donationId
        })
        .then((donationTransactions) => res.status(201).json({status: 201, data: donationTransactions}))
        .catch((error) => res.status(400).json(error));
    },

    update(req, res) {
        return DonationTransaction
        .findByPk(req.body.id)
        .then(donationTransactions => {
            if (!donationTransactions) {
            return res.status(404).json({
                message: 'Donation Transactions Not Found',
            });
            }
            return donationTransactions
            .update({
                donatorName     : req.body.donatorName      || donationTransactions.donatorName,
                donatorEmail    : req.body.donatorEmail     || donationTransactions.donatorEmail,
                donatorNumber   : req.body.donatorNumber    || donationTransactions.donatorNumber,
                isAnonym        : req.body.isAnonym         || donationTransactions.isAnonym,
                message         : req.body.message          || donationTransactions.message,
                paymentStatus   : req.body.paymentStatus    || donationTransactions.paymentStatus,
                channel         : req.body.channel          || donationTransactions.channel,
                donationAmount  : req.body.donationAmount   || donationTransactions.donationAmount,
                uniqueDigit     : req.body.uniqueDigit      || donationTransactions.uniqueDigit,
                donationId      : req.body.donationId       || donationTransactions.donationId
            })
            .then((donationTransactions) => res.status(200).json({status: 200, data: donationTransactions}))
            .catch((error) => res.status(400).json(error));
        })
        .catch((error) => res.status(400).json(error));
    },

    delete(req, res) {
        return DonationTransaction
        .findByPk(req.body.id)
        .then(donationtransactions => {
            if (!donationtransactions) {
            return res.status(400).json({
                message: 'Donation Transactions Not Found',
            });
            }
            return donationtransactions
            .destroy()
            .then(() => res.status(204).json({
                message: 'Donation Transactions deleted successfully'
            }))
            .catch((error) => res.status(400).json(error));
        })
        .catch((error) => res.status(400).json(error));
    },

    claim(req, res) {
        let transactionAmount = 0
        DonationTransaction
        .findByPk(req.body.id)
        .then(donationtransactions => {
            if (!donationtransactions) {
                return res.status(400).json({
                    message: 'Donation Transactions Not Found',
                });
            }
            if (donationtransactions.paymentStatus == 'paid') {
                return res.status(400).json({
                    message: 'Donation Transactions already claimed',
                });
            }
            if (donationtransactions.paymentStatus == 'expired') {
                return res.status(400).json({
                    message: 'Donation Transactions already expired',
                });
            }
            return donationtransactions.update({
                paymentStatus: 'paid'
            })
            .then((donationTransactions) => res.status(200).json({message: 'Donation Transaction claimed successfully'}))
            .catch((error) => res.status(400).json(error));
        })
        .catch((error) => res.status(400).json(error));
    },

    expire(req, res) {
        return DonationTransaction
        .findByPk(req.body.id)
        .then(donationtransactions => {
            if (!donationtransactions) {
                return res.status(400).json({
                    message: 'Donation Transactions Not Found',
                });
            }
            if (donationtransactions.paymentStatus == 'paid') {
                return res.status(400).json({
                    message: 'Donation Transactions already claimed',
                });
            }
            if (donationtransactions.paymentStatus == 'expired') {
                return res.status(400).json({
                    message: 'Donation Transactions already expired',
                });
            }
            return donationtransactions
            .update({
                paymentStatus: 'expired'
            })
            .then((donationTransactions) => res.status(200).json({message: 'Donation Transaction expired successfully'}))
            .catch((error) => res.status(400).json(error));
        })
        .catch((error) => res.status(400).json(error));
    },
};

function _randomDigit(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}