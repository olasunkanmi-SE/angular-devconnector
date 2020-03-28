const mongoose = require('mongoose');
const Joi = require('@hapi/joi')

const { Schema } = mongoose;



const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: Number,
        required: true

    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(5).max(30).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.number().required()
    });
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;