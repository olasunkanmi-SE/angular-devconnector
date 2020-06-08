const Joi = require('@hapi/joi')

module.exports.validateUser = (user) => {
    const Schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),

    });

    return Schema.validate(user);

}