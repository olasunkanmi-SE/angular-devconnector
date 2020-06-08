const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const { Schema } = mongoose;

const carBrandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    models: [
        {
            type: Schema.Types.ObjectId,
            ref: 'CarModel',
        }
    ]


});

const CarBrand = mongoose.model('carbrand', carBrandSchema);

function validateCarBrand(carbrand) {
    const Schema = Joi.object().keys({
        name: Joi.string().min(2).max(50)
    });

    return Schema.validate(carbrand);
}

exports.Brand = CarBrand;
exports.validate = validateCarBrand;