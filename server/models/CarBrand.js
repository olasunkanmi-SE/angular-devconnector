const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const { Schema } = mongoose;

const carSchema = new Schema({
    name: {
        type: String,
        required: true
    },

});

const CarBrand = mongoose.model('carbrand', carSchema);

function validateCarBrand(carbrand) {
    const Schema = Joi.object().keys({
        name: Joi.string().min(2).max(50)
    });

    return Schema.validate(carbrand);
}

exports.Brand = CarBrand;
exports.validate = validateCarBrand;