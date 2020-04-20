const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/default');
const _ = require('lodash');
const validate = require('../validation/auth')


//Sign in a User

module.exports.auth = async (req, res, next) => {
    const { error } = validate.validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ validationErr: 'Invalid username or password' });
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(404).json({ validationErr: 'Invalid username or password' });
        const payload = { _id: user._id, email: user.email }
        const token = await jwt.sign(payload, keys.jwtPrivateKey, { expiresIn: 3600 });
        res.json({ success: true, token: `Bearer ${token}` });
    } catch (ex) {

        next(ex);
    }

}

module.exports.getCurrentUser = async (req, res, next) => {
    try {
        res.json({ user: _.pick(req.user, ['_id', 'name', 'email']) });
    } catch (ex) {
        next(ex);
    }
}



