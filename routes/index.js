var express = require('express');
var router = express.Router();
const authMiddleware = require('../middleware/auth');
const authController = require('../controllers').auth;
const donationController = require('../controllers').donation;
const donationNewsController = require('../controllers').donationNews;
const donationTransactionController = require('../controllers').donationTransaction;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: 'Welcome to Ada Ide Donation API'
  });
});

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/api/donation', authMiddleware, donationController.list);
router.get('/api/donation/:id', authMiddleware, donationController.getById);
router.post('/api/donation/filter', authMiddleware, donationController.listByName);
router.post('/api/donation/donate', authMiddleware, donationController.donate);
router.post('/api/donation', authMiddleware, donationController.add);
router.put('/api/donation/:id', authMiddleware, donationController.update);
router.delete('/api/donation/:id', authMiddleware, donationController.delete);

router.get('/api/donationNews', authMiddleware, donationNewsController.list);
router.get('/api/donationNews/:id', authMiddleware, donationNewsController.getById);
router.post('/api/donationNews', authMiddleware, donationNewsController.add);
router.post('/api/donationNews/filter', authMiddleware, donationNewsController.listByDonationId);
router.put('/api/donationNews/:id', authMiddleware, donationNewsController.update);
router.delete('/api/donationNews/:id', authMiddleware, donationNewsController.delete);

router.get('/api/donationTransaction', authMiddleware, donationTransactionController.list);
router.get('/api/donationTransaction/:id', authMiddleware, donationTransactionController.getById);
router.post('/api/donationTransaction', authMiddleware, donationTransactionController.add);
router.post('/api/donationTransaction/filter', authMiddleware, donationTransactionController.listByDonationId);
router.post('/api/donationTransaction/claim', authMiddleware, donationTransactionController.claim);
router.post('/api/donationTransaction/expire', authMiddleware, donationTransactionController.expire);
router.put('/api/donationTransaction/:id', authMiddleware, donationTransactionController.update);
router.delete('/api/donationTransaction/:id', authMiddleware, donationTransactionController.delete);

module.exports = router;
