const foodModel = require('../model/productModel');
const vendorModel = require('../model/vendorModel');

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

const getAllFoods = async (req, res) => {
    try {
        const foods  = await foodModel.find({}, 'name');
        if(foods)
        {
            res.status(200).send(foods);
        }
        else{
            res.status(400).send('not found');
        }
    } catch (error) {
        res.status(400).send('not found');
    }
}

const getFoodsLike = async (req, res) => {

    const name = req.header('food-name');
    console.log(name);

    try {
        let foods  = await foodModel.find({name: {$regex: '.*' +  name + '.*'}});
        if(foods)
        {
            let toSend = [];
            for (let i = 0; i < foods.length; i++) {
                const vendor = foods[i].vendor;
                const details = await vendorModel.findOne({email: vendor});
                if(details)
                {
                    toSend.push({food: foods[i], details: details});
                }
                console.log(toSend);
            }
            res.status(200).send(toSend);
        }
        else{
            res.status(400).send('not found');
        }
    } catch (error) {
        res.status(400).send('not found');
    }
}

const getFoods = async (req, res) => {
    const email = req.header('email');
    console.log(email);
    try {
        const food = await foodModel.find({vendor: email});
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
        const food = foodModel.findById();
    }
    catch(e){

    }
        
}

const deleteFood = async (req, res) => {
    const id = req.header('food-id');
    try {
        const food = await foodModel.findByIdAndDelete(id);
        if(food)
        {
            res.status(200).send('deleted');
        }
        else{
            res.status(400).send('error')
        }
    } catch (error) {
        res.status(400).send('error');
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
            vendor: req.body.vendor
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


module.exports = {getFood, getFoods, createFood, deleteFood, getAllFoods, getFoodsLike};
