const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const { Schema } = mongoose;

const carBrandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    popular: {
        type: Boolean,
        required: true
    },
    models: [
        {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]


});

const CarBrand = mongoose.model('carbrand', carBrandSchema);

function validateCarBrand(carbrand) {
    const Schema = Joi.object().keys({
        name: Joi.string().min(2).max(50).required(),
        popular: Joi.boolean().required(),
        description: Joi.string()
    });

    return Schema.validate(carbrand);
}

exports.Brand = CarBrand;
exports.validate = validateCarBrand;