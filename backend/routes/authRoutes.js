const express = require("express");
const router = express.Router();

const {
    register,
    login,
    updatePassword,
    updateCourse,
} = require("../controllers/authController");

const auth = require("../middleware/authMiddleware");

// Public
router.post("/register", register);
router.post("/login", login);

// Protected
router.put("/update-password", auth, updatePassword);
router.put("/update-course", auth, updateCourse);

module.exports = router;