const express = require('express');
const auth = require( '../authentication');
const {createAccount, login, test} = require('../controllers/accountController.js');

const accountRouter = express.Router();

accountRouter.get('/test', auth, test);
accountRouter.post('/register', createAccount);
accountRouter.post('/login', login);

module.exports = accountRouter;