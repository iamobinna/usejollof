const locationModel = require('../model/locationModel');

const addLocation = async (req, res) => {
    try {
        const location = new locationModel(req.body);
        const saved = await location.save();
        if(saved)
            res.status(200).send(saved);
        else
            res.status(400).send('error')

    } catch (error) {
        res.status(400).send('error')
    }
}

const deleteLocation = async (req, res) => {
    const id = req.header('location-id');
    try {
        const del = await locationModel.findByIdAndDelete(id);
        if(del)
            res.status(200).send('deleted');
        else
            res.status(400).send('error');
        
    } catch (error) {
        res.status(400).send('error')
    }
}

const updateLocation = async (req, res) => {
    console.log(req.body._id);
    console.log(req.body.location);
    console.log(req.body.email);
    try {
        const updated = await locationModel.findOneAndUpdate({_id: req.body._id}, req.body, {new: true});
        console.log(updated);
        if(updated)
            res.status(200).send(updated);
        else
            res.status(400).send('error')
                    
    } catch (error) {
        res.status(400).send('error')
    }
}


const getLocation = async (req, res) => {
    const _id = req.header('location-id');
    try {
        const location = await locationModel.findById(_id);
        if(location)
            res.status(200).send(location);
        else
            res.status(400).send('error')
                    
    } catch (error) {
        res.status(400).send('error')
    }
}

const getLocations = async (req, res) => {
    const email = req.header('user-email');
    try {
        const location = await locationModel.find({email});
        if(location)
            res.status(200).send(location);
        else
            res.status(400).send('error')
                    
    } catch (error) {
        res.status(400).send('error')
    }
}

module.exports = {updateLocation, deleteLocation, addLocation, getLocation, getLocations}
