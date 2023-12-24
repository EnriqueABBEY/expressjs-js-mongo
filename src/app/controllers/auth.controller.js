const { status } = require("express/lib/response");
const { generateTokenForUser, getAuthToken } = require("../helpers/jwt.helper");
const ExpiredToken = require("../models/expiredToken.model");
const User = require("../models/user.model");
const bcrypt = require('bcrypt');

module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (user) {
            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (passwordIsValid) {
                const token = generateTokenForUser(user);
                res.json({
                    status: true, user: {
                        id: user._id,
                        lastname: user.lastname,
                        firstname: user.firstname,
                        username: user.username,
                        email: user.email,
                        picture: user.picture,
                        bio: user.bio,
                    }, access_token: token
                });
            } else res.status(422).json({ status: false, errors: { email: ['Invalid email or password'] } });
        } else res.status(422).json({ status: false, errors: { email: ['Invalid email or password'] } });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}
module.exports.register = async (req, res) => {
    try {
        const { username, lastname, firstname, password, email } = req.body;
        const user = await User.create({ username, lastname, firstname, password, email });

        res.json({ status: true, user: user });
    } catch (error) {
        // throw error;
        res.status(500).json({ status: false, message: error.message });
    }
}
module.exports.logout = async (req, res) => {
    try {
        const token = getAuthToken(req.headers.authorization);
        await ExpiredToken.create({ token: token });
        res.json({ status: true });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
}