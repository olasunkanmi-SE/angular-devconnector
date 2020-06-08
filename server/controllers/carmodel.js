const { Model, validate } = require('../models/CarModel');
const { Brand } = require('../models/CarBrand')


module.exports.create = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        let brand = await Brand.findById(req.params.id);
        console.log(brand);
        let models = brand.models;
        if (brand) {
            model = new Model({
                name: req.body.name,
                brand: req.params.id
            });
            models.unshift(model);
            brand.save();
            await model.save();
            return res.status(200).json(model)
        }

    } catch (error) {
        console.log(error);

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
