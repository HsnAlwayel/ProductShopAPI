const { User, Vendor } = require("../db/models/index.js");
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
        const payload = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role,
            expires: Date.now() + JWT_EXPIRATION_MS,
        };
        const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
        res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
};

exports.signin = async (req, res) => {
    const { user } = req;
    const vendor = await Vendor.findOne({ where: { userId: user.id } });
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        vendorSlug: vendor ? vendor.slug : null,
        expires: Date.now() + parseInt(JWT_EXPIRATION_MS),
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });
};