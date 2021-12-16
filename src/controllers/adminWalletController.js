const  walletModel = require('../model/walletModel');
const  accountModel = require('../model/accountModel');

const getWallet = async (req, res) => {
    const userID = req.header('user-id');
    console.log('getting wallet');
    try {
        const request = await walletModel.findOne({userID});

        if(request)
        {
            const user = await accountModel.findById(userID);
            if(user){
                return res.status(200).send({wallet: request, user})
            }else{
                return res.status(400).send('error');
            }
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send('error');
    }
}

const updateWallet = async (req, res) => {
    // console.log(req.body);
    try {
        const request = await walletModel.findByIdAndUpdate(req.body._id, req.body, {new: true});

        if(request)
        {
            return res.status(200).send({wallet: request})
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send('error');
    }
}

const getWallets = async (req, res) => {
    console.log('getting wallets')
    try {
        const request = await walletModel.find({accepted: true});

        if(request)
        {
            let toSend = [];
            for (let i = 0; i < request.length; i++) {
                const user = await accountModel.findById(request[i].userID);
                if(user){
                    toSend.push({wallet: request[i], user});
                }
            }
            return res.status(200).send(toSend);
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send('error');
    }
}

const getWalletRequests = async (req, res) => {
    console.log('getting requests')
    try {
        const request = await walletModel.find({answered: false});

        if(request)
        {
            let toSend = [];
            for (let i = 0; i < request.length; i++) {
                const user = await accountModel.findById(request[i].userID);
                if(user){
                    toSend.push({wallet: request[i], user});
                }
            }
            return res.status(200).send(toSend);
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send('error');
    }
}


module.exports = {getWallet, getWallets, getWalletRequests, updateWallet};
