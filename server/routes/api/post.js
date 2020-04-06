const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Post } = require('../../models/Post');
const validatePost = require('../../validation/post');

//Create a new Post

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

//Get all posts

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        posts.length > 0 ? res.status(201).json(posts) : res.status(400).json({ error: 'no posts found' });
    } catch (error) {
        res.status(400).json(error);

    }
})

// Get a Post by Id

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById({ _id: req.params.id });
        post ? res.status(201).json(post) : res.status(400).json({ error: 'post not found' });
    } catch (error) {
        res.status(400).json(error);
    }

})

//Delete a post

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let post = await Post.findOne({ user: req.user.id });
        if (req.user.id == post.user.toString()) {
            post.remove();
            return res.status(201).json({ success: true })
        } else {
            return res.send(401).json({ error: 'you cant delete post' })
        }
    } catch (error) {

    }
})

module.exports = router;