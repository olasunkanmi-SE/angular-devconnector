const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const carBrandController = require('../../controllers/carbrand');

//Create a Brand
router.post('/create', auth, carBrandController.create);
//Get all brands
router.get('/', auth, carBrandController.brands);
//Get brand by Id
router.get('/:id', auth, carBrandController.brand);
//Create a brand Model
router.post('/create/:id', auth, carBrandController.model);
//Get all Brand Models
router.get('/:id/models', auth, carBrandController.brandModels);
//Get a brand Model
router.get('/:id/:modelId', auth, carBrandController.brandModel)

module.exports = router;