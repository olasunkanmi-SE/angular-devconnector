const { User, validate } = require('../models/User');
const gravatar = require('gravatar');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

//Get User by ID
module.exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        if (!user) return res.status(404).json('user does not exist');
        return res.status(200).json({ user: user })
    } catch (ex) {
        next(ex);
    }
}

//Get all Users

module.exports.getUsers = async (req, res, next) => {
    try {
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
    } catch (ex) {
        next(ex);

    }


}

//Create User

module.exports.createUser = async (req, res, next) => {

    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json('user already exists');
        const avatar = gravatar.url(req.body.email, { s: 200, r: 'pg', d: 'mm' });
        user = new User({
            firstName: req.body.lastName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            gender: req.body.gender,
            avatar,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.confirmPassword = await bcrypt.hash(user.confirmPassword, salt);

        await user.save();
        return res.status(201).json({
            message: "User created successfully",
            createdUser: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                gender: user.gender,
                date: user.date,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/api/users/${user._id}`
                }
            }
        });
    } catch (ex) {
        next(ex);

    }


}



