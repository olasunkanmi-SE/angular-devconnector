const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const centerController = require('../../controllers/center');

//Create a center
router.post('/', auth, centerController.create);

module.exports = router;