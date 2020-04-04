const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserExperience(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    // data.startdate = !isEmpty(data.startdate) ? data.startdate : '';
    data.headline = !isEmpty(data.headline) ? data.headline : '';
    data.employmenttype = !isEmpty(data.employmenttype) ? data.employmenttype : '';


    if (Validator.isEmpty(data.title)) errors.title = 'please enter your title';

    if (Validator.isEmpty(data.company)) errors.company = 'please enter a company name';

    // if (Validator.isEmpty(data.startdate)) errors.startdate = 'Please enter a start date';

    if (Validator.isEmpty(data.headline)) errors.headline = 'Please enter a headline';

    if (Validator.isEmpty(data.employmenttype)) errors.employmenttype = 'Choose one employment type'

    return {
        errors,
        isValid: isEmpty(errors)
    }



}