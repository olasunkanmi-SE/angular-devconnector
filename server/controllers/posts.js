
const { Post } = require('../models/Post');
const validatePost = require('../validation/post');

//Create a new Post

module.exports.createPost = async (req, res, next) => {
    try {
        const { errors, isValid } = validatePost(req.body);
        if (!isValid) return res.status(400).json(errors);
        let post = new Post({
            text: req.body.text,
            firstname: req.user.firstname,
            avatar: req.user.avatar,
            user: req.user.id
        });

        post = await post.save();
        const posts = await Post.find().sort({ date: -1 });
        return res.status(201).json(posts);
    } catch (ex) {
        next(ex);
    }

}

//Update a Post

module.exports.updatePost = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);
        if (post) {
            post.text = req.body.text
        }

        post = await post.save();
        return res.status(201).json(post);

    } catch (error) {

    }
}

//Get all posts

module.exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        response = {
            count: posts.length,
            posts: posts,
        }
        posts.length > 0 ? res.status(200).json(response) : res.status(404).json('no posts found');
    } catch (ex) {
        next(ex);
    }

}

// Get a Post by Id

module.exports.getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById({ _id: req.params.id });
        post ? res.status(200).json(post) : res.status(404).json('post not found');
    } catch (ex) {
        next(ex);
    }

}

//Delete a post

module.exports.deletePost = async (req, res, next) => {
    try {
        /*****
         * Find one returns the latest entry from a user
         * let post = await Post.findOne({ user: req.user.id });
         * */
        let post = await Post.findById(req.params.id);
        if (req.user.id == post.user.toString()) {
            if (post.id.toString() == req.params.id) {
                post.remove();
                const posts = await Post.find().sort({ date: -1 });
                posts.splice(post, 1);
                return res.status(200).json(posts)
            } else {
                return res.status(404).json({ msg: 'not found' })
            }

        } else {
            return res.send(401).json({ msg: 'you cannot delete post' })
        }
    } catch (ex) {
        next(ex);
    }

}

// Like and Unlike a Post

module.exports.likeOrUnlikeAPost = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);
        let likes = post.likes;
        if (likes.filter(item => item.user.toString() == req.user.id).length > 0) {
            const removeLike = likes.map(like => like.user.toString()).indexOf(req.user.id);
            likes.splice(removeLike, 1);
            post.save();
            return res.status(201).json(post);
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



    } catch (ex) {
        next(ex);
    }

}

//Create a comment

module.exports.createAPostComment = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);
        let comments = post.comments;
        const newComment = {
            user: req.user.id,
            text: req.body.text,
            firstname: req.user.firstname,
            avatar: req.user.avatar
        }
        comments.unshift(newComment);
        post.save();
        return res.status(201).json(post)
    } catch (err) {
        console.error(err);
    }

}

//Update a comment

module.exports.updateComment = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);
        let comments = post.comments;
        comments.map(comment => {
            if (req.user.id == comment.user.toString()) {
                if (comment.id === req.params.commentId) {
                    comment.text = req.body.text;
                    post.save();
                    return res.status(201).json(comment);
                }
            } else {
                return res.status(400).json({ msg: 'unauthorized action' })
            }

        })

    } catch (error) {
        console.log(error)
            ;
    }
}

//Reply a comment

module.exports.replyAComment = async (req, res, next) => {
    try {
        let comment;
        let post = await Post.findById(req.params.id);
        let comments = post.comments;
        comments.map(comment => {
            const reply = {
                user: req.user.id,
                text: req.body.text,
                firstname: req.user.firstname,
                avatar: req.user.avatar
            }
            if (comment.id == req.params.commentId) {
                comment.replies.unshift(reply);
            }

            post.save();
            return res.status(201).json(comment);

        });


    } catch (ex) {
        next(ex);
    }

}

//LikeDislike a comment

module.exports.likeAComment = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);
        let comments = post.comments;
        comments.map(comment => {
            if (comment.id == req.params.commentId) {
                let likes = comment.likes;
                if (likes.filter(like => like.user.toString() == req.user.id).length > 0) {
                    const disLike = likes.map(like => like.user.toString()).indexOf(req.user.id);
                    likes.splice(disLike, 1);
                    post.save();
                    return res.status(201).json(comment);

                }
                else {
                    comment.likes.unshift({ user: req.user.id });
                    post.save();
                    return res.status(201).json(comment)
                }
            }

        })

    } catch (ex) {
        next(ex);

    }
}
//Remove a Comment

module.exports.deleteAComment = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);
        let comments = post.comments;

        comments.map(comment => {
            if (comment.user.toString() == req.user.id && comment.id == req.params.commentId) {
                comment.remove();
                post.save();
                return res.status(200).json(post);
            } else {
                return res.status(400).json('you cannot delete this comment');

            }
        });

    } catch (ex) {
        next(ex);
    }
}

//delete reply

module.exports.deleteAReply = async (req, res, next) => {

    try {
        let replies
        let post = await Post.findById(req.params.id);
        let comments = post.comments;

        comments.map(comment => {
            if (comment.user.toString() == req.user.id) {
                replies = comment.replies;
                replies.map((reply) => {
                    if (reply.id === req.params.replyId) {
                        let removeReply = comment.replies.map(item => item.id).indexOf(req.params.replyId);
                        comment.replies.splice(removeReply, 1);
                    }

                })
            } else {
                return res.status(400).json({ msg: 'unauthorized action' })
            }

        })


        post.save();
        res.status(200).json(replies);
    }

    catch (ex) {
        console.log(ex);
    }
}

