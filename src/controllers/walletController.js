const  walletModel = require('../model/walletModel');

const getWallet = async (req, res) => {
    const userID = req.header('user-id');
    console.log(userID);
    try {
        const request = await walletModel.findOne({userID});

        if(request)
        {
            console.log('here');
            return res.status(200).send({accepted: request.accepted, amount: request.amount});
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send('error');
    }
}

const addCashToWallet = async (req, res) => {
    const userID = req.header('user-id');
    const toAdd = req.header('user-funds');
    console.log(userID);
    try {
        const request = await walletModel.findOneAndUpdate({userID}, {$inc: {amount: toAdd}}, {new: true});

        if(request)
        {
            console.log('here');
            return res.status(200).send({accepted: request.accepted, amount: request.amount});
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send('error');
    }
}

const createWallet = async (req, res) => {
        
    try {

        const wallet = new walletModel({
            userID: req.body.userID,
            accountType: req.body.accountType,
        })

        const toSend = await wallet.save();

        if(toSend)
        {
            console.log('here');
            return res.status(200).send('made');
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send('error');
    }
}


module.exports = {getWallet, createWallet, addCashToWallet};
