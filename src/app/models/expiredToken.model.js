const mongoose = require('mongoose');

const expiredTokenSchema = mongoose.Schema(
    {
        token: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('expired_tokens', expiredTokenSchema);