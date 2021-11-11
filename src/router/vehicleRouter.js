const express = require('express');
const orderRouter = express.Router();
const auth = require( '../authentication');
const {getVehicle, updateVehicle, removeVehicle, addVehicle, getVehicleById}  = require('../controllers/vehicleController');

orderRouter.post('/create', auth, addVehicle);
orderRouter.get('/', auth, getVehicle);
orderRouter.get('/vehicle', auth, getVehicleById);
orderRouter.put('/update', auth, updateVehicle);
orderRouter.delete('/', auth, removeVehicle);

module.exports = orderRouter;