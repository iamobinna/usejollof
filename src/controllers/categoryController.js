const  categoryModel = require('../model/categoryModel');

const updateCategory = async (req, res) => {
    console.log(req.body)
    try {
        const update = await categoryModel.findOne();
        const saved = await categoryModel.findOneAndUpdate(update, req.body);
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

const getCategory = async (req, res) => {
    try {
        const update = await categoryModel.findOne();
        if(update)
        {
            return res.status(200).send(update);
        }else{
            return res.status(400).send('error');
        }
        
    } catch (error) {
        return res.status(400).send('error');
    }
}


module.exports = {getCategory, updateCategory};