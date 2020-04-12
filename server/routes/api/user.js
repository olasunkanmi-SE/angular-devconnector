const { User, validate } = require('../../models/User');
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


router.get('/', async (req, res) => {
    const users = await User.find().select('_id name email avatar date');
    response = {
        count: users.length,
        users: users.map(user => {
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                date: user.date,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/api/users/${user._id}`
                }
            }
        })
    }
    users.length > 0 ? res.json(response) : res.status(404).send('No users found');
});

router.post('/register', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ email: 'user already exists' });
        const avatar = gravatar.url(req.body.email, { s: 200, r: 'pg', d: 'mm' });
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            repeat_password: req.body.repeat_password,
            gender: req.body.gender,
            avatar,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        return res.status(201).json({
            message: "User created successfully",
            createdUser: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                date: user.date,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/api/users/${user._id}`
                }
            }
        });
    } catch (error) {
        console.log(error);
    }


})


module.exports = router;