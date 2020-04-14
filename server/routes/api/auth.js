const { User } = require('../../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken');
const keys = require('../../../config/default');
const passport = require('passport');
const _ = require('lodash');
// import { enviroment } from '../../../src/environments/environment';




router.post('/', async (req, res, next) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ validationErr: 'Invalid username or password' });
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ validationErr: 'Invalid username or password' });
        const payload = { _id: user._id, email: user.email }
        const token = await jwt.sign(payload, keys.jwtPrivateKey, { expiresIn: 3600 });
        res.json({ success: true, token: `Bearer ${token}` });
    } catch (ex) {

        next(ex);
    }

})

router.get('/current', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        res.json({ user: _.pick(req.user, ['_id', 'name', 'email']) });
    } catch (ex) {
        next(ex);
    }
})

function validateUser(user) {
    const Schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),

    });

    return Schema.validate(user);

}


module.exports = router;