const Community = require('../models/Community');

exports.createPost = async (req, res) => {
    try {
        const post = new Community(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getFeed = async (req, res) => {
    try {
        const posts = await Community.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Community.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addComment = async (req, res) => {
    try {
        const { user, text } = req.body;
        const post = await Community.findByIdAndUpdate(
            req.params.id,
            { $push: { comments: { user, text } } },
            { new: true }
        );
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};