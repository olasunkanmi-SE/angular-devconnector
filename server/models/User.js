const mongoose = require('mongoose');
const Joi = require('@hapi/joi')

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    confirmPassword: {
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
    }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const Schema = Joi.object().keys({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        confirmPassword: Joi.ref('password'),
        avatar: Joi.string(),
        gender: Joi.string().valid('male', 'female')


    });

    return Schema.validate(user);

}

exports.User = User;
exports.validate = validateUser;
