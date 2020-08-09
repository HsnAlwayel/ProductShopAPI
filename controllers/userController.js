const { User } = require("../db/models.js");
const bcrypt = require("bcrypt");

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