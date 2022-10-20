const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const UserSchema = require("../models/userModel");
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the required fields")
    };

    const userExists = await UserSchema.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists")
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashPassword(password, salt);

    const user = await UserSchema.create({
        username,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201);
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data")
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const User = await UserSchema.findOne({ email });

    if (User & (await bcrypt.compare(password, User.password))) {
        res.status(200);
        res.json({
            _id: User.id,
            email: User.email,
            token: generateToken(User._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid user credentials")
    }
});

const getCredentials = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
});

function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10m"
    })
};


module.exports = {
    registerUser,
    loginUser,
    getCredentials
}