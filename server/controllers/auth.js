const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/default');
const Validate = require('../validation/auth');
const _ = require('lodash');


//SIgn in a User 

module.exports.auth = async (req, res, next) => {
    const { error } = Validate.validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ validationErr: 'Invalid username or password' });
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ validationErr: 'Invalid username or password' });
        const payload = { _id: user._id, email: user.email }
        const token = await jwt.sign(payload, keys.jwtPrivateKey, { expiresIn: 3600 });
        res.json({ success: true, token: `Bearer ${token}` });
    } catch (error) {
        next(error);
        console.log(error);
    }



}