const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth');
const auth = require('../../middlewares/auth');
const _ = require('lodash');


// import { enviroment } from '../../../src/environments/environment';




router.post('/', authController.auth)

router.get('/current', auth, async (req, res) => {
    res.json({ user: _.pick(req.user, ['_id', 'name', 'email']) });
})




module.exports = router;