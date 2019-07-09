const express = require('express');

const Posts = require('./db.js');

const router = express.Router();

router.use(express.json());

// GET ALL POSTS
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (errror) {
    console.log('GET ALL POSTS ERROR');
    res
      .status(500)
      .json({ messaage: 'The posts information could not be retrieved.' });
  }
});

// GET A SPECIFIC POST
router.get('/:id', async (req, res) => {
  try {
    const posts = await Posts.findById(req.params.id);
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (errror) {
    console.log('GET ALL POSTS ERROR');
    res
      .status(500)
      .json({ error: 'The post information could not be retrieved.' });
  }
});

// POST A NEW POST
router.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.contents) {
      res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.',
      });
    }
    const newPost = await Posts.insert(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
});

// GET ALL MESSAGES BY SPECIFIC POST
router.get('/:id/comments', async (req, res) => {
  try {
    const postsComments = await Posts.findCommentById(req.params.id);
    if (postsComments && postsComments.length < 1) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
    res.status(200).json(postsComments);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
});

// DELETE A SPECIFIC POST
router.delete('/:id', async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The comment has been deleted' });
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The post could not be removed',
    });
  }
});

// POST A NEW COMMENT FOR A SPECIFIC POST
router.post('/:id/comments', async (req, res) => {
  try {
    if (!req.body.text || !req.body.post_id) {
      res.status(400).json({
        errorMessage: 'Please provide text for the comment.',
      });
    }
    const newComment = await Posts.insertComment(req.body);
    if (newComment && newComment.length < 1) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
    res.status(201).json(newComment);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'There was an error while saving the comment to the database',
    });
  }
});

// UPDATE A SPECIFIC POST
router.put('/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.contents) {
      res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.',
      });
    }
    const updatedPost = await Posts.update(req.params.id, req.body);
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: 'The post information could not be modified.',
    });
  }
});

module.exports = router;
