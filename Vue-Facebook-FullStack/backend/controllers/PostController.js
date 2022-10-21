const PostSchema = require("../models/PostModel");
const UserSchema = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const createPost = asyncHandler(async (req, res) => {
    const { image, description } = req.body;
    const post = await PostSchema.create({
        image,
        description,
        userId: req.user.id
    });

    if (post) {
        res.status(201);
        res.json({
            _id: post.id,
            image: post.image,
            description: post.description
        })
    } else {
        res.status(400);
        throw new Error("An error occurred")
    }
});

const updatePost = asyncHandler(async (req, res) => {
    const post = await PostSchema.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found")
    };

    const user = await UserSchema.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found")
    };

    if (post.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized")
    };

    const updatePost = await PostSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatePost);
});


const deletePost = asyncHandler(async (req, res) => {
    const post = await PostSchema.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found")
    };

    const user = await UserSchema.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found")
    };

    if (post.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized")
    };

    await post.remove();
    res.status(200).json({ id: req.params.id })
});

const likePost = asyncHandler(async (req, res) => {
    try {
        const post = await PostSchema.findById(req.params.id);
        if (!post.likes.includes(req.user.id)) {
            await post.updateOne({ $push: { likes: req.user.id } });
            res.status(200).json("Post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.user.id } });
            res.status(200).json("Post has been disliked")
        }
    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
});

const getPost = asyncHandler(async (req, res) => {
    const post = await PostSchema.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found")
    } else {
        res.status(200).json(post);
    }
});