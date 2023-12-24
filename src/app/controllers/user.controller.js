const User = require("../models/user.model");
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.indexUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }
}

module.exports.findUser = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ status: false, message: 'Invlid id provided' });
        } else {
            const user = await User.findById(req.params.id).select('-password');
            if (!user) {
                res.status(404).json({ status: false, message: 'Ressource not found' });
            } else res.json(user);
        }

    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }
}
module.exports.editUser = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ status: false, message: 'Invlid id provided' });
        } else {
            const userUpdated = await User.findByIdAndUpdate({ _id: req.params.id }, {
                $set: {
                    bio: req.body.bio,
                    lastname: req.body.lastname, firstname: req.body.firstname, username: req.body.username,
                    picture: `${process.env.PICTURE_BASE_URL}+${req.body.lastname}+${req.body.firstname}`
                }
            }, {
                new: true
            });
            res.json({ status: true, user: userUpdated });
        }

    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }
}
