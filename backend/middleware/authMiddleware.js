const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token 

    // check if there is authorization object and if it starts with 'Bearer' (due to formatting of token when sent: <bearer>  <token>)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from header by removing 'bearer'
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from token
            req.user = await User.findById(decoded.id).select('-password') // { id } refers to when we generated JWT token in userController.js
            next()
        } catch (error) {
            console.log(error)
            res.status(401) // status 401 means not authorized
            throw new Error('Not authorized')
        }
    }
    // if no token
    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }