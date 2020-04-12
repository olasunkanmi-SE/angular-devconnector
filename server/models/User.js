const mongoose = require('mongoose');
const Joi = require('@hapi/joi')

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    repeat_password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now

    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const Schema = Joi.object().keys({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        repeat_password: Joi.ref('password'),
        avatar: Joi.string(),
        gender: Joi.string().required().valid('male', 'female')


    });

    return Schema.validate(user);

}

exports.User = User;
exports.validate = validateUser;
