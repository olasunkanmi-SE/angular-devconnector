const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserProfileInput(data) {
    let errors = {};
    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";
    data.location = !isEmpty(data.location) ? data.location : "";

    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) errors.handle = "Handle needs to be between 2 and 40 characters"

    if (Validator.isEmpty(data.handle)) errors.handle = 'please enter a profile handle'

    if (Validator.isEmpty(data.status)) errors.status = 'User status is required'

    if (Validator.isEmpty(data.skills)) errors.skills = 'User skills is required'

    if (Validator.isEmpty(data.location)) errors.location = 'User Location is required'

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'please enter a valid URL'
        }
    }

    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'please enter a valid URL'
        }
    }


    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'please enter a valid URL'
        }
    }


    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'please enter a valid URL'
        }
    }


    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'please enter a valid URL'
        }
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }



}