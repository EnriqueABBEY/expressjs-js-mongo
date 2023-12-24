const Post = require('../models/post.model');

module.exports.indexPost = async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
}
module.exports.findPost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404).json({ status: false, message: 'Ressource not found' });
    } else res.json(post);
}

module.exports.storePost = async (request, response) => {
    const data = request.body;
    if (!data.title) {
        response.status(422).json({ errors: { title: ['Field title is required'] } });
    }
    if (!data.content) {
        response.status(422).json({ errors: { content: ['Field content is required'] } });
    }

    const postItem = await Post.create({
        title: data.title,
        content: data.content,
        createdBy: 'ABBEY Enrique'
    })

    response.json({ status: true, post: postItem });
}

module.exports.editPost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.json({ status: 404, message: 'Ressource not found' });
    } else {
        const postUpdated = await Post.findByIdAndUpdate(post, req.body, {
            new: true
        });
        res.json({ status: true, post: postUpdated });
    }
};

module.exports.destroyPost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404).json({ status: false, message: 'Ressource not found' });
    } else {
        const resource = await Post.deleteOne(post);
        if (resource) {
            res.json({ status: true })
        } else res.status(400).json({ status: false, 'message': 'error' })
    }
};

module.exports.likePost = async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            $addToSet: { likes: req.body.userId }
        }, { new: true }).then((data) => {
            res.json({ status: true, data: data });
        })
    } catch (error) {
        res.status(500).json(error);
    }
};
module.exports.dislikePost = async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            $pull: { likes: req.body.userId }
        }, { new: true }).then((data) => {
            res.json({ status: true, data: data });
        })
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }
};