const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const carBrandController = require('../../controllers/carbrand');


router.post('/create', auth, carBrandController.create);

router.get('/', auth, carBrandController.brands);

router.get('/brand/:id', auth, carBrandController.brand);