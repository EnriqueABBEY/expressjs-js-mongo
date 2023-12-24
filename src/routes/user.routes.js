const express = require("express");
const { indexUsers, findUser, editUser } = require("../app/controllers/user.controller");
const authMiddleware = require("../app/middleware/auth.middleware");
const router = express.Router();

router.get("/", authMiddleware, indexUsers)
router.get("/:id", authMiddleware, findUser)
router.put("/:id", authMiddleware, editUser)

module.exports = router;