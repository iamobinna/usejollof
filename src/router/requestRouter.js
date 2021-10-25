const express = require('express');
const requestRouter = express.Router();
const auth = require( '../authentication');
const {createUpgradeRequest, getUpgradeRequests, getUpgradeRequest, getUpgradeRequestById, deleteUpgradeRequest, acceptUpgradeRequest, rejectUpgradeRequest}  = require('../controllers/requestController');

requestRouter.post('/create', auth, createUpgradeRequest);
requestRouter.put('/approve', auth, acceptUpgradeRequest);
requestRouter.put('/reject', auth, rejectUpgradeRequest);
requestRouter.get('/getrequest', auth, getUpgradeRequest);
requestRouter.get('/getrequest-id', auth, getUpgradeRequestById);
requestRouter.get('/getrequests', auth, getUpgradeRequests);
// requestRouter.delete('/deleterequests', auth, deleteUpgradeRequest);

module.exports = requestRouter;

