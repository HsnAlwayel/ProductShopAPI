const { User } = require("../db/models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.signup = async (req, res, next) => {
    const { password } = req.body;
    const saltedRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltedRounds);
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};

exports.signin = (req, res) => {
    const { user } = req;
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        expires: Date.now() + parseInt(JWT_EXPIRATION_MS),
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });
};