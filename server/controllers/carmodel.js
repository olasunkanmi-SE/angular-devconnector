const { Model, validate } = require('../models/CarModel');


module.exports.create = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return status(400).send(error.details[0].message);
    try {
        model = new Model({
            name: req.body.name,
            brand: req.brand.id
        });

        await model.save();
        return res.status(200).json({
            model: {
                id: model._id,
                name: model.name,
                brand: model.brand
            }
        })
    } catch (error) {
        consols.log(error);

    }
}

module.exports.models = async (req, res) => {
    let models = await Model.find();
    if (models) {
        return res.status(200).json(models)
    } else {
        return res.status(404).json('no car models found');
    }

}

module.exports.model = async (req, res) => {
    let model = await Model.findById(req.params.id);
    if (model) {
        return res.status(200).json(model);
    } else {
        return res.status(404).json('car model not found');
    }
}
