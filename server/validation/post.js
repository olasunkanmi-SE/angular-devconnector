const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserPost(data) {
    let errors = {};
    data.title = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Post must be between 10 and 300 characters'
    }

    if (Validator.isEmpty(data.text)) errors.text = 'please enter your text';

    return {
        errors,
        isValid: isEmpty(errors)
    }



}