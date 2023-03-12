const express = require('express');
const { login } = require('../controller/auth/login');
const { logout } = require('../controller/auth/logout');
const { register } = require('../controller/auth/register');
const router = express.Router();


router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)



module.exports = router;