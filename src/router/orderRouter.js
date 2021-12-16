const express = require('express');
const orderRouter = express.Router();
const auth = require( '../authentication');
const {createOrder, updateOrder, getOrders, getOrder, getOrdersForReport, payOrder}  = require('../controllers/orderController');

orderRouter.post('/create', auth, createOrder);
orderRouter.get('/pay', auth, payOrder);
orderRouter.get('/', auth, getOrders);
orderRouter.get('/get', auth, getOrder);
orderRouter.get('/get-report', auth, getOrdersForReport);
orderRouter.put('/update', auth, updateOrder);

module.exports = orderRouter;