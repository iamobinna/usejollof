const express = require('express');
const foodRouter = express.Router();
const auth = require( '../authentication');
const {getFood, getFoods, createFood}  = require('../controllers/foodController');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname)
    }
  });

const upload = multer({ storage: storage });

foodRouter.get('/getfood', auth, getFood);
foodRouter.get('/getfoods', auth, getFoods);
foodRouter.post('/create', auth ,upload.array('images', 3), createFood)

module.exports = foodRouter;

