const express = require('express');
const locationRouter = express.Router();
const auth = require( '../authentication');
const {addLocation, deleteLocation, updateLocation, getLocations, getLocation}  = require('../controllers/locationController');

locationRouter.get('/', auth, getLocations);
locationRouter.get('/id', auth, getLocation);
locationRouter.delete('/id', auth, deleteLocation);
locationRouter.put('/update', auth, updateLocation);
locationRouter.post('/create', auth, addLocation);

module.exports = locationRouter;

