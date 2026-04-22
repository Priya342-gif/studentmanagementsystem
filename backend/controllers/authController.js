const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password, course } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            course,
        });

        res.status(201).json({
            msg: "User registered successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: {
                name: user.name,
                email: user.email,
                course: user.course,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE PASSWORD
exports.updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user);

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Old password incorrect" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ msg: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE COURSE
exports.updateCourse = async (req, res) => {
    try {
        const { course } = req.body;

        const user = await User.findById(req.user);

        user.course = course;
        await user.save();

        res.json({ msg: "Course updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};