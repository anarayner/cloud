const Router = require("express");
const {body} = require('express-validator');
require('dotenv').config()
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/auth.middleware')

const router = new Router

router.post("/registration",
    body('email').isEmail(),
    body('password').isLength({min:6, max:20}),
    AuthController.registration)
router.post("/login", AuthController.login)
router.get("/auth", authMiddleware, AuthController.auth)

module.exports = router
