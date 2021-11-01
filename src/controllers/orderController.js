const orderModel = require('../model/orderModel');

const createOrder = async (req, res) => {
    console.log(req.body);
    try {
        const order = new orderModel(req.body);
        const saved = await order.save();
        if(saved)
        {
            res.status(200).send(saved);
        }
        else{
            res.status(400).send('error');
        }
    } catch (error) {
        res.status(400).send('error');
    }
}

const getOrders = async (req, res) => {
    const email = req.header('user-email');
    const vendor = req.header('vendor-email');
    try {
        let orders = null;
        if(email)
        {
            orders = await orderModel.find({user: email});
        }else{
            orders = await orderModel.find({vendor});
        }
        if(orders)
        {
            res.status(200).send(orders);
        }
        else{
            res.status(400).send('error');
        }
    } catch (error) {
        res.status(400).send('error');
    }
}

const updateOrder = async (req, res) => {
    try {
        console.log('updating order');
        const updated = await orderModel.findOneAndUpdate({_id: req.body._id} , req.body, {new: true});
        if(updated)
        {
            res.status(200).send(updated);
        }else{
            res.status(400).send('error');
        }
    } catch (error) {
        res.status(400).send('error');
    }
}

module.exports = {createOrder, getOrders, updateOrder};