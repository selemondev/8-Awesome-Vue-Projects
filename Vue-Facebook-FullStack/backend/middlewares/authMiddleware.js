const jwt = require("jsonwebtoken");
const UserSchema = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await UserSchema.findById(decoded.id).select("-password");
        next();
    } else {
        res.status(400);
        throw new Error("Unauthorized")
    };

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token")
    }
});

module.exports = {
    protect
}