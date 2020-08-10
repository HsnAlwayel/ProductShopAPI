const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../db/models/User")
exports.localStrategy = new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({
                where: { username },
            });

            const passwordsMatch = user
                ? await bcrypt.compare(password, user.password)
                : false;
            if (passwordsMatch) {
                return done(null, user);
            }
        } catch (error) {
            done(null, false);
        }
    })