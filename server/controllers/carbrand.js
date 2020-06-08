const { Brand, validate } = require('../models/CarBrand');


module.exports.create = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        brand = new Brand({
            name: req.body.name
        })
        await brand.save();
        return res.status(201).json({
            brand: {
                id: brand._id,
                name: brand.name,
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