//const User = require('../models/userModel')
//const asyncHandler = require('express-async-handler')

// check if user exists in database and JOI error checking
//const userErrorCheck = asyncHandler(async (email, error, res) => {
//    // JOI
//    if(error) {
//        console.log(error);
//        return res.send(error.details) // returns error array from JOI
//    }
//    // check if user exists
//    const userExists = await User.findOne({email})
//    if(userExists) { // don't re-register user again if it already exists
//        res.status(400)
//        throw new Error('User already exists')
//    }
//})

//module.exports = userErrorCheck