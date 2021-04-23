const uuidv4 = require('uuid').v4
const DonationNews = require('../models').DonationNews;

module.exports = {
    list(req, res) {
      return DonationNews
        .findAll({
          order: [
            ['createdAt', 'DESC'],
          ],
        })
        .then((donationNews) => res.status(200).json({status: 200, data: donationNews}))
        .catch((error) => { res.status(400).json(error); });
    },

    listByDonationId(req, res) {
        return DonationNews
          .findAll({
            where: {
              donationId: req.body.donationId
            },
            order: [
              ['createdAt', 'DESC'],
            ],
          })
          .then((donationNews) => res.status(200).json({status: 200, data: donationNews}))
          .catch((error) => { res.status(400).json(error); });
      },
        
    getById(req, res) {
        return DonationNews
        .findByPk(req.body.id)
        .then((donationNews) => {
            if (!donationNews) {
            return res.status(404).json({
                message: 'Donation News Not Found',
            });
            }
            return res.status(200).json({status: 200, data: donationNews});
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(error);
        });
    },

    add(req, res) {
        return DonationNews
        .create({
            id: uuidv4(),
            title: req.body.title,
            body: req.body.body,
            donationId: req.body.donationId
        })
        .then((donationNews) => res.status(201).json({status: 201, data: donationNews}))
        .catch((error) => res.status(400).json(error));
    },

    update(req, res) {
        return DonationNews
        .findByPk(req.body.id)
        .then(donationNews => {
            if (!donationNews) {
            return res.status(404).json({
                message: 'Donation News Not Found',
            });
            }
            return donationNews
            .update({
                title: req.body.title || donationNews.title,
                body: req.body.body || donationNews.body,
                donationId: req.body.donationId || donationNews.donationId
            })
            .then((donationNews) => res.status(200).json({status: 200, data: donationNews}))
            .catch((error) => res.status(400).json(error));
        })
        .catch((error) => res.status(400).json(error));
    },

    delete(req, res) {
        return DonationNews
        .findByPk(req.body.id)
        .then(donationnews => {
            if (!donationnews) {
            return res.status(400).json({
                message: 'Donation News Not Found',
            });
            }
            return donationnews
            .destroy()
            .then(() => res.status(204).json({
                message: 'Donation News deleted successfully'
            }))
            .catch((error) => res.status(400).json(error));
        })
        .catch((error) => res.status(400).json(error));
    },
};