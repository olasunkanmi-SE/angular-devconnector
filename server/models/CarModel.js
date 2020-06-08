const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { Schema } = mongoose;

const carModelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'CarBrand',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }


});

const CarModel = mongoose.model('carmodel', carModelSchema);

function validateCarModel(carmodel) {
    const Schema = Joi.object().keys({
        name: Joi.string().min(2).max(50).required()
    });

    return Schema.validate(carmodel);

}

exports.Model = CarModel;
exports.validate = validateCarModel;

