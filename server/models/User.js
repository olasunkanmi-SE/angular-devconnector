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
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now

    },
    premium: {
        plan: {
            type: String,


        }
    }
});

const User = mongoose.model('user', userSchema);

function validateUser(user) {
    const Schema = Joi.object().keys({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        avatar: Joi.string()

    });

    return Schema.validate(user);

}

exports.User = User;
exports.validate = validateUser;
