const  deliveryBoyModel = require('../model/deliveryBoyModel');
const  vehicleModel = require('../model/vehicleModel');
const bcrypt = require( 'bcryptjs');
const jwt = require( 'jsonwebtoken');

const getDeliveryBoy = async (req, res) => {

    const partner = req.header('partner-email');
    const id = req.header('driver-id');

    try {
        let vehicles = null;
        if(partner){
            vehicles = await deliveryBoyModel.find({partner});
        }else if(id){
            vehicles = await deliveryBoyModel.findById(id);
        }
        if(vehicles)
        {
            return res.status(200).send(vehicles);
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        return res.status(400).send('error');
    }
}

const updateDeliveryBoy = async (req, res) => {

    try {
        
        const updated = await deliveryBoyModel.findByIdAndUpdate(req.body._id, req.body, {new: true});
        if(updated)
        {
            return res.status(200).send(updated);
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        return res.status(400).send('error');
    }
}

const removeDeliveryBoy = async (req, res) => {
    const id = req.header('driver-id');

    try {

        const find = await deliveryBoyModel.findById(id);
        if(find && find.vehicle && find.vehicle !== null){
            console.log('vehicle', find.vehicle);
            await vehicleModel.findByIdAndUpdate(find.vehicle, {driver: null});
        }
        const updated = await deliveryBoyModel.findByIdAndDelete(id);
        
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

const  createAccount = async (req, res) => {
    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const account = new deliveryBoyModel({
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        vehicle: req.body.vehicle,
        name: req.body.user,
        password: hashedPassword,
        picUrl: req.body.name,
        partner: req.body.partner
    });
    
    try {
        const savedAccount = await account.save();
        // const token = jwt.sign({_id: savedAccount._id}, process.env.TOKEN_SECRET);

        // const objectToSend = {user: savedAccount, auth_token: token}

        res.status(200).send(savedAccount);
    } catch (error) {
        res.status(400).send(error);
    }
}

const login = async (req, res) => {
    
    try {
        //Check email
        const emailExist = await deliveryBoyModel.findOne({email: req.body.email});
        if(!emailExist) return res.status(400).send('EMAIL or passsword is wrong');
        
        //Check Password
        const validPass = await bcrypt.compare(req.body.password, emailExist.password);
        if(!validPass) return res.status(400).send('Invalid Email or PASSWORD');
        
        //Logged In
        const token = jwt.sign({_id: emailExist._id}, process.env.TOKEN_SECRET);
        
        res.status(200).send({user: emailExist, auth_token: token});
        
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {removeDeliveryBoy, createAccount, login, updateDeliveryBoy, getDeliveryBoy}
