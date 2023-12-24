const express = require("express");
const { login, register, logout } = require("../app/controllers/auth.controller");
const authMiddleware = require("../app/middleware/auth.middleware");
const router = express.Router();

router.post("/login", login)
router.post("/register", register)
router.post("/logout", authMiddleware, logout)


module.exports = router;