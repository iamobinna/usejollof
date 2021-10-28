const foodModel = require('../model/productModel');

const getFood = async (req, res) => {
    const id = req.header('food-id');
    try {
        const food = await foodModel.findById(id);
        if(food)
        {
            res.status(200).send(food);
        }
        else{
            res.status(400).send('error')
        }
    } catch (error) {
        res.status(400).send('error');
    }
}

const getFoods = async (req, res) => {
    const email = req.header('email');
    try {
        const food = await foodModel.find({email});
        if(food)
        {
            res.status(200).send(food);
        }
        else{
            res.status(400).send('error')
        }
    } catch (error) {
        res.status(400).send('error');
    }
}

const updateFood = async () => {
    try {
        const foood = foodModel.findById();
    } catch (error) {
        
    }
}

const deleteFood = async () => {
    try {
        const foood = foodModel.findById();
    } catch (error) {
        
    }
}

const createFood = async (req, res) => {
    try {

        const images = [];

        for (let i = 0; i < req.files.length; i++) {
            images.push(req.files[i].filename);
        }

        const val = new foodModel({
            name: req.body.name,
            price: req.body.price,
            time: req.body.time,
            pictures: images,
            category: req.body.category,
            vendor: req.body.email
        });

        const saved = await val.save();
        if(saved){
            res.status(200).send(saved);
        }
        else{
            res.status(400).send('error');
        }
        
    } catch (error) {
        res.status(400).send('error');
    }
}


module.exports = {getFood, getFoods, createFood};
