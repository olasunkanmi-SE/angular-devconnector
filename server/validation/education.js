const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserEducation(data) {
    let errors = {};
    data.school = !isEmpty(data.school) ? data.school : '';
    // data.startyear = !isEmpty(data.startyear) ? data.startyear : '';


    if (Validator.isEmpty(data.school)) errors.school = 'please enter a school name ';

    // if (Validator.isEmpty(data.startyear)) errors.startyear = 'Please enter a start year';

    return {
        errors,
        isValid: isEmpty(errors)
    }



}