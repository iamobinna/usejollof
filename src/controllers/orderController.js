const orderModel = require('../model/orderModel');

const createOrder = async (req, res) => {
    console.log(req.body);
    if(req.body.paid !== undefined){
        req.body.paid = false;
    }
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

const getOrder = async(req, res) => {
    const productID = req.header('order-id');
    try {
        if(productID){
            const order = await orderModel.findById(productID);
            if(order){
                res.status(200).send(order);
            }else{
                res.status(400).send('error');
            }
        }else{
            res.status(400).send('error');
        }
    } catch (error) {
        res.status(400).send('error');
    }
}

const getOrders = async (req, res) => {
    const email = req.header('user-email');
    const vendor = req.header('vendor-email');
    const deliveryBoy = req.header('driver-id');
    try {
        let orders = null;
        if(email)
        {
            orders = await orderModel.find({user: email});
        }else if(deliveryBoy){
            orders = await orderModel.find({assignedTo: deliveryBoy, completed: false});
        }
        else{
            orders = await orderModel.find({vendor, assignedTo: null});
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

const getOrdersForReport = async (req, res) => {
    const vendor = req.header('vendor-email');
    try {
        const orders = await orderModel.find({vendor, completed: true});
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

const payOrder = async (req, res) => {
    const orderID = req.header('order-id');
    try {
        const updated = await orderModel.findByIdAndUpdate(orderID, {paid: true}, {new: true});
        if(updated)
        {
            res.status(200).send(updated);
        }else{
            res.status(400).send('error');
        }
    } catch (error) {
        console.log(error);
        res.status(400).send('error');
    }
}

module.exports = {createOrder, getOrders, updateOrder, getOrder, getOrdersForReport, payOrder};