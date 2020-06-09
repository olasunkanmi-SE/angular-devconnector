const { Center, validate } = require('../models/Centre');

module.exports.create = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        center = new Center({
            name: req.body.name
        })
        await center.save();
        return res.status(201).json({
            id: center._id,
            name: center.name,
            appointments: center.appointments
        })
    } catch (error) {
        console.log(error);

    }
}