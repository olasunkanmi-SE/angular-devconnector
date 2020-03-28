const { App } = require('../models/app')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const apps = await App.find();
    res.send(apps);
});


router.post('/', async (req, res) => {
    let app = new App({
        name: req.body.name
    });

    app = await app.save();
    res.send(app);
})


module.exports = router;