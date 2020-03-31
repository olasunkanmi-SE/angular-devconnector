const { User } = require('../../models/User');
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi')





router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ validationErr: 'Invalid username or password' });
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ validationErr: 'Invalid username or password' });
        res.json({ login: 'true' });
    } catch (error) {
        console.log(error);
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