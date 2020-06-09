const { Brand, validate } = require('../models/CarBrand');


module.exports.create = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        brand = new Brand({
            name: req.body.name,
            popular: req.body.popular
        })
        await brand.save();
        return res.status(201).json({
            brand: {
                id: brand._id,
                name: brand.name,
                popular: brand.popular,
                models: brand.models
            }
        })
    } catch (error) {
        console.log(error);

    }
}

module.exports.brands = async (req, res) => {
    const brands = await Brand.find();
    if (brands) {
        return res.status(200).json(brands);
    }
    return res.status(404).json('No car brands available at the moment');

}

module.exports.brand = async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    if (brand) {
        return res.status(200).json(brand);
    }
    return res.status(404).json('car brand not found');
}

module.exports.model = async (req, res) => {
    let brand = await Brand.findById(req.params.id);
    if (brand) {
        let models = brand.models;
        const model = {
            name: req.body.name,
            description: req.body.description
        }

        models.unshift(model);
        brand.save();
        return res.status(201).json(brand);

    } else {
        return res.status(404).json({ error: 'brand does not exists' })
    }

}

module.exports.brandModels = async (req, res) => {
    let brand = await Brand.findById(req.params.id);
    if (brand) {
        let models = brand.models;
        return res.status(200).json(models);
    } else {
        return res.status(404).json({ error: 'brand does not exists' })
    }
}

module.exports.brandModel = async (req, res) => {
    let brand = await Brand.findById(req.params.id);
    if (brand) {
        let models = brand.models;
        if (models.filter(model => model._id == req.params.modelId).length > 0) {
            models.map((model) => {
                if (model._id == req.params.modelId) {
                    return res.status(200).json(model);
                }
            })
        } else {
            return res.status(404).json({ error: 'model does not exists' })
        }
    } else if (!brand) {
        return res.status(404).json({ error: 'brand does not exists' })
    }
}