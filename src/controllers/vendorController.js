const  vendorModel = require('../model/vendorModel');

const getVendor = async (req, res) => {
    // console.log(req.body);
    const email = req.header('user-email');
    console.log(email);
    try {
        const request = await vendorModel.findOne({email});

        if(request)
        {
            console.log('here');
            return res.status(200).send(request);
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send('error');
    }
}

module.exports = {getVendor};
