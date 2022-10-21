const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { registerUser, loginUser, getCredentials } = require("../controllers/authController");
router.route("/credentials").get(protect, getCredentials)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)