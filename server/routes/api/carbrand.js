const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const brandController = require('../../controllers/carbrand');


router.post('/create', auth, brandController.create);

router.get('/', auth, brandController.brands);

router.get('/brand', auth, brandController.brand);