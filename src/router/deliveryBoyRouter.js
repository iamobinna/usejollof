const express = require('express');
const auth = require( '../authentication');

/* MULTER- */

const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname)
    }
  });

const upload = multer({ storage: storage });

/* -MULTER */

const {login, createAccount, removeDeliveryBoy, updateDeliveryBoy, getDeliveryBoy} = require('../controllers/deliveryBoyController.js');

const accountRouter = express.Router();

// accountRouter.get('/test', auth, test);
accountRouter.get('/get', auth, getDeliveryBoy);
accountRouter.put('/update', auth, updateDeliveryBoy);
accountRouter.post('/register', auth, upload.single('image') , createAccount);
accountRouter.post('/login', login);
accountRouter.delete('/', auth, removeDeliveryBoy);

module.exports = accountRouter;