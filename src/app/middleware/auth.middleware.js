const { getAuthUserId, getAuthToken } = require("../helpers/jwt.helper");
const expiredToken = require("../models/expiredToken.model");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
    try {
        const token = getAuthToken(req.headers.authorization);
        if (token) {
            const isTokenExpired = await expiredToken.findOne({ token: token });
            if (isTokenExpired) {
                throw Error('Session expired');
            } else {
                const userId = getAuthUserId(req.headers.authorization);
                if (userId) {
                    const user = User.findById(userId);
                    if (user) {
                        next();
                    } else throw Error('Unauthorized');
                } else throw Error('Unauthorized');
            }
        } else throw Error('Unauthorized');

    } catch (err) {
        res.status(401).json({ status: false, message: err.message })
    }
}