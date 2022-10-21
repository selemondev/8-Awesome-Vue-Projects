const UserSchema = require("../models/userModel");
const PostSchema = require("../models/PostModel");
const CommentSchema = require("../models/CommentModel");
const asyncHandler = require("express-async-handler");
const updateUser = asyncHandler(async (req, res) => {
    if (req.user.id === req.params.id) {
        try {
            const updatedUser = await UserSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(updatedUser)
        } catch (err) {
            res.status(400);
            throw new Error(err.message)
        }
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    if (req.user.id === req.params.id) {
        const user = await UserSchema.findById(req.params.id);
        try {
            await PostSchema.deleteMany({ username: user.username });
            await CommentSchema.deleteMany({ username: user.username });
            await UserSchema.findByIdAndDelete(user);
            res.status(200).json({ id: req.params.id })
        } catch (err) {
            res.status(400);
            throw new Error(err.message)
        }
    } else {
        res.status(400).json("You can only delete your account")
    }
});

module.exports = {
    updateUser,
    deleteUser
}