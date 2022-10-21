const { protect } = require("../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();
const { updateUser, deleteUser } = require("../controllers/userController");
router.route("/update/:id").put(protect, updateUser);
router.route("/delete/:id").delete(protect, deleteUser);
module.exports = router;
