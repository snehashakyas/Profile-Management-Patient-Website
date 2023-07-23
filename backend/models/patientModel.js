const mongoose = require('mongoose')

// creating schema
const patientSchema = mongoose.Schema({
    user: { // each user has a set of different added patients
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    fullName: {
        type: String,
        required: [true, 'Please add a full name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    contact: {
        type: String,
        required: [true, 'Please add a contact']
    }, 
    dob: {
        type: String,
        required: [true, 'Please add a date of birth']
    },
    profilePic: {
        type: String,
        required: [true, 'Please add a profile picture']
    }
}, {
    timestamps: true, // creates updated at and created at field
})

module.exports = mongoose.model('Patient', patientSchema)