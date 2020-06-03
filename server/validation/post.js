const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserPost(data) {
    let errors = {};
    data.text = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, { min: 10 })) {
        errors.text = 'Post must be minimum 10 characters'
    }

    if (Validator.isEmpty(data.text)) errors.text = 'please enter texts to create post';

    return {
        errors,
        isValid: isEmpty(errors)
    }



}