const express = require('express');
const walletRouter = express.Router();
const auth = require( '../authentication/adminAuth');
const {getWallet, getWallets, getWalletRequests, updateWallet} = require('../controllers/adminWalletController');

walletRouter.get('/get', auth, getWallet);
walletRouter.get('/', auth, getWallets);
walletRouter.get('/requests', auth, getWalletRequests);
walletRouter.put('/update', auth, updateWallet);

module.exports = walletRouter;

