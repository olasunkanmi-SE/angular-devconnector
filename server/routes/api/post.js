const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Post } = require('../../models/Post');


router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let post = new Post({
        body: req.body.body,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    post = await post.save();
    res.json(post);



});