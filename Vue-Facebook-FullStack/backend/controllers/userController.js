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

const getUser = asyncHandler(async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId ? await UserSchema.findById(userId) : await UserSchema.findOne({ username: username });
        res.status(200).json(user)
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }

});

const followUser = asyncHandler(async (req, res) => {
    if (req.user.id !== req.params.id) {
        try {
            const user = await UserSchema.findById(req.params.id);
            const currentUser = await UserSchema.findById(req.user.id);
            if (!user.followers.includes(req.user.id)) {
                await user.updateOne({ $push: { followers: req.user.id } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("You have successfully followed this user")
            } else {
                res.status(403);
                res.json("Error! You already follow this user")
            }
        } catch (err) {
            res.status(404);
            throw new Error(err.message)
        }
    } else {
        res.status(403).json("You can't follow yourself")
    }
});


const unFollowUser = asyncHandler(async (req, res) => {
    if (req.user.id !== req.params.id) {
        try {
            const user = await UserSchema.findById(req.params.id);
            const currentUser = await UserSchema.findById(req.user.id);
            if (user.followers.includes(req.user.id)) {
                await user.updateOne({ $pull: { followers: req.user.id } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("User has been unfollowed")
            } else {
                res.status(403);
                res.json("Error! You don't follow this user")
            }
        } catch (err) {
            res.status(404);
            throw new Error(err.message)
        }
    } else {
        res.status(403).json("You can't unfollow yourself")
    }
});

const getFriends = asyncHandler(async (req, res) => {
    try {
        const user = await UserSchema.findById(req.params.id);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return UserSchema.findById(friendId)
            })
        );

        let friendsList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendsList.push({ _id, username, profilePicture })
        });

        res.status(200).json(friendsList);
    } catch (err) {
        res.status(400);
        throw new Error(err.message)
    }
}) 

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    followUser,
    unFollowUser,
    getFriends
}