const mongoose = require("mongoose");
const Joi = require("@hapi/joi");


const { Schema } = mongoose;

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
    const schema = Joi.object().keys({
        name: Joi.string()
            .min(3)
            .max(30)
            .required()
    });
    return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;