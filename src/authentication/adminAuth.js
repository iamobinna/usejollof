const jwt = require('jsonwebtoken');
const accountModel = require('../model/accountModel');
const bcrypt = require( 'bcryptjs');

const auth = async (req, res, next) => {

    console.log('authenticating admin')

    const token = req.header('auth-token');
    const adminPass = req.header('admin-pass');

    if(!token || !adminPass) return res.status(401).send('Access Denied');
    try {
        const admin = await accountModel.findOne({email: 'admin@gmail.com'});
        const validPass = await bcrypt.compare(adminPass, admin.password);
        if(!validPass)
            {return res.status(400).send('Invalid token');}

        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();

    } catch (error) {
        console.log(error);
        res.status(400).send('Invalid token');
    }
}

module.exports = auth;