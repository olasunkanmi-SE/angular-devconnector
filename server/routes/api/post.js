const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Post } = require('../../models/Post');
const validatePost = require('../../validation/post');


router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { errors, isValid } = validatePost(req.body);
        if (!isValid) return res.status(400).json(errors);
        let post = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        });

        post = await post.save();
        res.json(post);

    } catch (error) {
        res.status(400).json(error);

    }



});

module.exports = router;