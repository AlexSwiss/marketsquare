const express = require('express');
const router = express.Router();

//post model
const Posts = require('../../models/Posts');

//GET api/posts
router.get('/', (req, res) => {
    Posts.find()
        .sort({date: -1})
        .then(posts => res.json(posts));
});     

//POST api/posts
router.post('/', (req, res) => {
    const newPost = new Posts ({
        title: req.body.title,
        postBody: req.body.postBody,
        author: req.body.author
    });
    newPost.save()
        .then(posts => res.json(posts));
});


//DELETE api/post
router.delete('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => post.remove().then(() => res.json({ success: true})))
    .catch(err => res.status(404).json({ success: false}));
});

module.exports = router;