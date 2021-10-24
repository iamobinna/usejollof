const express = require('express');
const auth = require( '../authentication');

/* MULTER- */

const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, req.body.name)
    }
  });

const upload = multer({ storage: storage });

/* -MULTER */

const {login, test, createAccount, getUser} = require('../controllers/accountController.js');

const accountRouter = express.Router();

accountRouter.get('/test', auth, test);
accountRouter.get('/get', auth, getUser);
accountRouter.post('/register', upload.single('image') , createAccount);
accountRouter.post('/login', login);

module.exports = accountRouter;