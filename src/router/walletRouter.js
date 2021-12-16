const express = require('express');
const walletRouter = express.Router();
const auth = require( '../authentication');
const {getWallet, createWallet, addCashToWallet}  = require('../controllers/walletController');

walletRouter.get('/get', auth, getWallet);
walletRouter.post('/create', auth, createWallet);
walletRouter.get('/add', addCashToWallet, addCashToWallet);
// requestRouter.delete('/deleterequests', auth, deleteUpgradeRequest);

module.exports = walletRouter;

