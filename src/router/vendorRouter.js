const express = require('express');
const vendorRouter = express.Router();
const auth = require( '../authentication');
const {getVendor}  = require('../controllers/vendorController');

vendorRouter.get('/get', auth, getVendor);
// requestRouter.delete('/deleterequests', auth, deleteUpgradeRequest);

module.exports = vendorRouter;

