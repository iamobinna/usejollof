const express = require('express');
const categoryRouter = express.Router();
const auth = require( '../authentication');
const {getCategory, updateCategory}  = require('../controllers/categoryController');

categoryRouter.get('/get', auth, getCategory);
categoryRouter.put('/update', auth, updateCategory);
// requestRouter.delete('/deleterequests', auth, deleteUpgradeRequest);

module.exports = categoryRouter;

