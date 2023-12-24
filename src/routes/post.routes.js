const express = require("express");
const { storePost, indexPost, editPost, findPost, destroyPost, likePost, dislikePost } = require("../app/controllers/post.controller");
const router = express.Router();

router.get("/", indexPost)
router.get("/:id", findPost)
router.post('/like/:id', likePost);
router.post('/dislike/:id', dislikePost);
router.post('/', storePost);
router.put('/:id', editPost);
router.delete('/:id', destroyPost);


module.exports = router;