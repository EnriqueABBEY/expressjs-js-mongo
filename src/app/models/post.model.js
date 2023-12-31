const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdBy: {
            type: String,
            required: true
        },
        likes: {
            type: [String],
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('post', postSchema);