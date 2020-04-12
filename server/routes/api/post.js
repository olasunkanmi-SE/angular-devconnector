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
        response = {
            count: posts.length,
            posts: posts,

        }
        posts.length > 0 ? res.status(201).json(response) : res.status(400).json({ error: 'no posts found' });
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
            return res.send(401).json({ unauthorized: 'you cant delete post' })
        }
    } catch (error) {
        res.status(400).json(error);
    }
})

// Like and Unlike a Post

router.post('/like/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        let likes = post.likes;
        if (likes.filter(item => item.user.toString() == req.user.id).length > 0) {
            const removeLike = likes.map(like => like.user.toString()).indexOf(req.user.id);
            likes.splice(removeLike, 1);
            post.save();
            return res.status(201).json({ unliked: true });
        }

        if ((likes.filter(item => item.user.toString() == req.user.id).length == 0) || likes.filter(item => item.user.toString() !== req.user.id)) {
            likes.unshift({ user: req.user.id });
            post.save()
            return res.status(201).json(post);
        }


        else {
            likes.unshift({ user: req.user.id });
            post.save()
            return res.status(201).json(post);
        }



    } catch (error) {
        res.status(400).json(error);

    }
})

//Create a comment

router.post('/comment/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        let comments = post.comments;
        const newComment = {
            user: req.user.id,
            text: req.body.text,
            name: req.user.name,
            avatar: req.user.avatar
        }
        comments.unshift(newComment);
        post.save();
        return res.status(201).json(post)
    } catch (error) {
        console.log(error);

    }
})

//Reply a comment

router.post('/comment/reply/:id/:commentId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        let comments = post.comments;
        if (comments.filter(comment => comment.id == req.params.commentId)) {
            const reply = {
                user: req.user.id,
                text: req.body.text,
                name: req.user.name,
                avatar: req.user.avatar
            }
            comments.map(comment => {
                if (comment.id == req.params.commentId) {
                    comment.replies.unshift(reply);
                }
            });

            post.save();

            return res.status(201).json(post);


        }

    } catch (error) {
        console.log(error);
    }
})

//Remove a Comment

router.delete('/comment/:id/:commentId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        let comments = post.comments;

        comments.map(comment => {
            if (comment.user.toString() == req.user.id && comment.id == req.params.commentId) {
                comment.remove();
                post.save();
                return res.status(201).json(post);
            } else {
                return res.status(400).json({ error: 'you cannot delete this comment' });

            }
        });



    } catch (error) {
        console.log(error);
    }
})
//delete reply
router.delete('/comment/reply/:id/:replyId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        let comments = post.comments;
        if (comments.filter(comment => comment.replies.map(reply => {
            if (reply.user.toString() == req.user.id) {
                if (comments.filter(comment => comment.replies.map(reply => {
                    if (reply.id === req.params.replyId) {
                        comments.filter(comment => {
                            let removeReply = comment.replies.map(item => item.id).indexOf(req.params.replyId);
                            comment.replies.splice(removeReply, 1);
                        })
                        post.save();
                        return res.status(201).json(post);
                    }
                }
                ))) { }

            }
            //  else if (comments.filter(comment => comment.replies.map(reply => {
            //     if (reply.user.toString() != req.user.id) {
            //         return res.status(400).json({ error: 'you are not authorized to delete the reply' });

            //     }
            // })))
            {

            }

        }


        ))) {

        }




    } catch (error) {
        console.log(error);
    }
})


// Remove a reply
// router.delete('/comment/reply/:id/:replyId', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     try {
//         let post = await Post.findById(req.params.id);
//         let comments = post.comments;

//         comments.filter(comment => {
//             if (comment.user.toString() == req.user.id) {
//                 let replies = comments.map(comment => comment.replies.map(reply => reply.id));
//                 let reply = replies.filter(reply => reply);
//                 for (let i = 0; i < reply.length; i++) {
//                     let removeReply = reply[i].indexOf(req.params.replyId);
//                     reply = reply[i].splice(removeReply, 1);
//                     post.save();
//                     return res.status(201).json(post);

//                 }


//                 // comments.splice(reply, 1);
//                 // post.save();
//                 // return res.status(201).json(post);
//             } else {
//                 return res.status(400).json({ error: 'you cannot delete this reply' });

//             }
//         });



//     } catch (error) {
//         console.log(error);
//     }
// })





module.exports = router;