const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../../controllers/posts');
const auth = require('../../middleware/auth');



//Create a new Post

router.post('/', auth, postController.createPost);

//Get all posts

router.get('/', auth, postController.getPosts);

// Get a Post by Id

router.get('/:id', postController.getPostById)

//Delete a post

router.delete('/:id', auth, postController.deletePost);

// Like and Unlike a Post

router.post('/like/:id', auth, postController.likeOrUnlikeAPost);

//Create a comment

router.post('/comment/:id', auth, postController.createAPostComment);

//Reply a comment

router.post('/comment/reply/:id/:commentId', auth, postController.replyAComment);

//Remove a Comment

router.delete('/comment/:id/:commentId', auth, postController.deleteAComment);

//delete reply

router.delete('/comment/reply/:id/:replyId', auth, postController.deleteAReply);



// Remove a reply
// router.delete('/comment/reply/:id/:replyId', auth, async (req, res) => {
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