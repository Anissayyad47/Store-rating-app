const express = require('express')
const {login,signup, updataPass} = require('../controllers/authController.js')

const router = express.Router();

// // POST /api/auth/signup → Register a new user
router.post('/signup', signup);

// POST /api/auth/login → Login existing user
router.post('/login', login);

router.post('/update', updataPass);

module.exports=router

