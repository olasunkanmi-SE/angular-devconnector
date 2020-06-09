const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const { Schema } = mongoose;

const centreSchema = new Schema({
    name: {
        type: String,
        required: true
    },


    appointment: [
        {
            duration: {
                type: String,
                required: true,
                slots: [
                    {
                        name: {
                            type: String,
                            required: true
                        },
                        booked: {
                            type: Boolean,
                            required: true,
                            default: false
                        }
                    }
                ]
            },
            book: {
                type: Date,
                min: new Date(),
                max: maxDays
            },

            date: {
                type: Date,
                default: Date.now
            }

        }
    ]

});

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var date = new Date();
var maxDays = date.addDays(14);

const Center = mongoose.model('center', centreSchema);

function validateCenter(center) {
    const Schema = Joi.object().keys({
        name: Joi.string().min(2).max(50).required(),
    });
    return Schema.validate(center);
}

exports.Center = Center;
exports.validate = validateCenter;