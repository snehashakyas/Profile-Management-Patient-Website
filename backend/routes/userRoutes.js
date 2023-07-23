const express = require('express')
const router = express.Router()
const { registerUser, signinUser, getMe } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware') // for verifying and authenticating token

router.post('/', registerUser) // register 
router.post('/signin', signinUser) // login
router.get('/me', protect, getMe) // to get user information

module.exports = router