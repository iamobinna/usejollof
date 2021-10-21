const express = require('express');
const accountModel = require('../model/accountModel.js');
const {registerValidation, loginValidation} = require('../validation/accountValidation.js');
const bcrypt = require( 'bcryptjs');
const jwt = require( 'jsonwebtoken');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const router =  express.Router();

const test = (req, res) => {
    res.send('Secret information- only available when logged in');
}

const removeAccount = async (req, res) => {
    let email = req.email;
    try {
        const deleted = accountModel.deleteOne({email: email});
        if(deleted)
        {
            res.status(200).send('deleted');
        }
    } catch (error) {
        res.status(400).send('not deleted');
    }
}

const updateAccount = async (req, res) => { //updation
    try {
        res.status(200).send('updated');
    } catch (error) {
        res.status(400).send('not deleted');
    }
}


const  createAccount = async (req, res) => {
    //Validation
    const toValidate = {
        email: req.body.email,
        name: req.body.user,
        password: req.body.password
    }
    const {error} = registerValidation(toValidate);
    if(error) return res.status(400).send(error);

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const account = new accountModel({
        email: req.body.email,
        name: req.body.user,
        password: hashedPassword
    });
    
    try {
        const savedAccount = await account.save();
        const token = jwt.sign({_id: savedAccount._id}, process.env.TOKEN_SECRET);

        const objectToSend = {
            name: savedAccount.name,
            email: savedAccount.email,
            auth_token: token
        }

        res.send(objectToSend);
    } catch (error) {
        res.status(400).send(error);
    }
}

const login = async (req, res) => {    
    //Validation
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error);
    
    
    
    try {
        //Check email
        const emailExist = await accountModel.findOne({email: req.body.email});
        if(!emailExist) return res.status(400).send('EMAIL or passsword is wrong');
        
        //Check Password
        const validPass = await bcrypt.compare(req.body.password, emailExist.password);
        if(!validPass) return res.status(400).send('Invalid Email or PASSWORD');
        
        //Logged In
        const token = jwt.sign({_id: emailExist._id}, process.env.TOKEN_SECRET);
        
        const objectToSend = {
            name: emailExist.name,
            email: emailExist.email,
            auth_token: token
        }

        // res.setHeader('auth-token', token);
        res.status(200).send(objectToSend);
        
    } catch (error) {
        res.status(400).send(error);
    }

}
module.exports = {createAccount, login, test};
module.exports.default = router;