const  {requestModel} = require('../model/requestModel');
const accountModel = require('../model/accountModel.js');
const vendorModel = require('../model/vendorModel.js');


const createUpgradeRequest = async (req, res) => {
    // console.log(req.body);
    try {
        const request = new requestModel(req.body);
        const saved = await request.save();

        if(saved)
        {
            console.log('here')
            return res.status(200).send({request: saved});
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send('error');
    }
}

const deleteUpgradeRequest = async (req, res) => {
    // console.log(req.body);
    try {
        await requestModel.findById(req.body.id);
        const del = await requestModel.findByIdAndDelete(req.body.id);

        if(del)
        {
            return res.status(200).send('deleted');
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send('error');
    }
}

const getUpgradeRequests = async (req, res) => {
    // console.log(req.body);
    try {
        const requests = await requestModel.find();

        if(requests)
        {
            return res.status(200).send(requests);
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send('error');
    }
}

const getUpgradeRequest = async (req, res) => {
    const email = req.header('email');

    // console.log(req.body);
    try {
        const request = await requestModel.findOne({requestedBy: email});

        if(request)
        {
            return res.status(200).send(request);
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send('error');
    }
}

const getUpgradeRequestById = async (req, res) => {
    const id = req.header('_id');

    // console.log(req.body);
    try {
        const request = await requestModel.findById(id);

        if(request)
        {
            return res.status(200).send(request);
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send('error');
    }
}

const acceptUpgradeRequest = async (req, res) => {
    console.log(req.body);
    try {
        const updated = await requestModel.findOneAndUpdate({_id: req.body.id}, {answered: true, approved: true}, {new: true});
        const request = await requestModel.findById(req.body.id);
        if(request)
        {
            const vendor = new vendorModel({
                email: request.requestedBy,
                name: request.name,
                location: request.location
            });

            await vendor.save();
            const accountUpdated = await accountModel.findOneAndUpdate({email: request.requestedBy}, {type: req.body.type});
        }
        if(updated)
        {
            return res.status(200).send(updated);
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send('error');
    }
}

const rejectUpgradeRequest = async (req, res) => {
    // console.log(req.body);
    try {
        const updated = await requestModel.findOneAndUpdate({_id: req.body.id}, {answered: true, approved: false}, {new: true});

        if(updated)
        {
            return res.status(200).send(updated);
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send('error');
    }
}


module.exports = {createUpgradeRequest, deleteUpgradeRequest, getUpgradeRequestById, acceptUpgradeRequest,getUpgradeRequest, getUpgradeRequests, rejectUpgradeRequest};