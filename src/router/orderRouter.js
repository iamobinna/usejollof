const express = require('express');
const orderRouter = express.Router();
const auth = require( '../authentication');
const {createOrder, updateOrder, getOrders, getOrder}  = require('../controllers/orderController');

orderRouter.post('/create', auth, createOrder);
orderRouter.get('/', auth, getOrders);
orderRouter.get('/get', auth, getOrder);
orderRouter.put('/update', auth, updateOrder);

module.exports = orderRouter;