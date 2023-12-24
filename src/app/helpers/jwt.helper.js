var jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const maxAge = process.env.JWT_TTL;
module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign({
            userId: userData.id
        }, JWT_SECRET, {
            expiresIn: maxAge
        });
    },
    getAuthToken: function (authorisation) {
        return (authorisation != null) ? authorisation.split(' ')[1] : null;
    },
    getAuthUserId: function (authorisation) {
        let userId = null;
        let token = module.exports.getAuthToken(authorisation);
        if (token) {
            try {
                let jwt_token = jwt.verify(token, JWT_SECRET);
                if (jwt_token) {
                    userId = jwt_token.userId;
                }
            } catch (error) {
                throw error;
            }
        }
        return userId;
    }
}