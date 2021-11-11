const  vehicleModel = require('../model/vehicleModel');

const getVehicle = async (req, res) => {

    const partner = req.header('partner-email');
    const driver = req.header('driver-email');

    try {
        let vehicles = null;
        if(partner){
            vehicles = await vehicleModel.find({partner});
        }else if(driver){
            vehicles = await vehicleModel.find({driver});
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

const getVehicleById = async (req, res) => {
    const id = req.header('vehicle-id');
    try {
        const vehicle = await vehicleModel.findById(id);

        if(vehicle)
        {
            return res.status(200).send(vehicle);
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        return res.status(400).send('error');
    }
}

const addVehicle = async (req, res) => {

    try {

        const vehicle = new vehicleModel(req.body);
        const saved = await vehicle.save();

        if(saved)
        {
            return res.status(200).send(saved);
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        return res.status(400).send('error');
    }
}

const updateVehicle = async (req, res) => {

    try {

        const vehicle = await vehicleModel.findByIdAndUpdate(req.body._id, req.body, {new: true});

        if(vehicle)
        {
            return res.status(200).send(vehicle);
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        return res.status(400).send('error');
    }
}

const removeVehicle = async (req, res) => {

    const id = req.header('vehicle-id')

    try {

        const vehicle = await vehicleModel.findByIdAndDelete(id);

        if(vehicle)
        {
            return res.status(200).send(vehicle);
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        return res.status(400).send('error');
    }
}


module.exports = {getVehicle, updateVehicle, removeVehicle, addVehicle, getVehicleById};