const express = require('express');
const accountModel = require('../model/accountModel.js');
const {registerValidation, loginValidation} = require('../validation/accountValidation.js');
const bcrypt = require( 'bcryptjs');
const jwt = require( 'jsonwebtoken');
const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' });

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
        password: hashedPassword,
        picUrl: req.body.name,
        type: 'user'
    });
    
    try {
        const savedAccount = await account.save();
        const token = jwt.sign({_id: savedAccount._id}, process.env.TOKEN_SECRET);

        const objectToSend = {...savedAccount,auth_token: token}

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
        
        res.status(200).send({user: emailExist, auth_token: token});
        
    } catch (error) {
        res.status(400).send(error);
    }

}

const getUser = async (req, res) => {
    const id = req.header('user-id');
    console.log('here', id);

    try {
        let emailExist = await accountModel.findById(id);
        
        res.status(200).send(emailExist);
        
    } catch (error) {
        res.status(400).send(error);
    }
}
module.exports = {createAccount, login, test, getUser};
module.exports.default = router;