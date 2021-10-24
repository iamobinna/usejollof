const express = require('express');
const requestRouter = express.Router();
const auth = require( '../authentication');
const {createUpgradeRequest, getUpgradeRequests, getUpgradeRequest, deleteUpgradeRequest, acceptUpgradeRequest}  = require('../controllers/requestController');

requestRouter.post('/create', auth, createUpgradeRequest);
requestRouter.put('/accept', auth, acceptUpgradeRequest);
requestRouter.get('/getrequest', auth, getUpgradeRequest);
requestRouter.get('/getrequests', auth, getUpgradeRequests);
// requestRouter.delete('/deleterequests', auth, deleteUpgradeRequest);

module.exports = requestRouter;

