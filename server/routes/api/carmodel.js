const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const carModelController = require('../../controllers/carmodel');


router.post('/', auth, carModelController.create);
router.get('/models', auth, carModelController.models);
router.get('/model/:id', auth, carModelController.model);