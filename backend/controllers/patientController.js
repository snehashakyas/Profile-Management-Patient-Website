const asyncHandler = require('express-async-handler')

const Patient = require('../models/patientModel')
const User = require('../models/userModel')
const { validateAddPatient, validateEditPatient } = require('../validator')

const path = require('path');

// @desc    Get patient
// @route   GET /api/patient
// @access  Private
const getPatient = asyncHandler(async (req, res) => {
    const patients = await Patient.find({ user: req.user.id }) // we have user field on Patient (which is relationship to User model). shows patients of specific user. 
    res.status(200).json(patients) // sends back found patient(s)
})

// @desc    Add patient (create)
// @route   POST /api/patient
// @access  Private
const addPatient = asyncHandler(async (req, res) => {
    const fileExtension = req.file && path.extname(req.file.path).substring(1); // for profilePic checking purposes

    const { email } = req.body
    const { error, value } = validateAddPatient({
        fullName: req.body.fullName,
        email: req.body.email,
        contact: req.body.contact,
        dob: req.body.dob,
        profilePic: fileExtension,
    })

    // JOI
    if(error) {
       console.log(error);
        return res.status(403).send(error.details) // returns error array from JOI
    }
    // check if user exists
    const patientExists = await Patient.findOne({email})
    if(patientExists) { // don't re-register user again if it already exists
        res.status(400)
        throw new Error('User already exists')
    }
    // patientErrorCheck(email, error, res)

    const patient = await Patient.create({
        user: req.user.id,
        fullName: req.body.fullName,
        email: req.body.email,
        contact: req.body.contact,
        dob: req.body.dob,
        profilePic: req.file.path,
    })
    res.status(200).json(patient) // sends back patient
})

// @desc    Edit patient (update) or view patient details
// @route   PUT /api/patient/:id
// @access  Private
const editPatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id) // we get ID by req.params.id because id is in URL. 1 specific patient     

    if (!patient) { // check for patient
        res.status(400)
        throw new Error('Patient not found.')
    }

    // user check
    //const user = await User.findById(req.user.id) // get user info
    if(!req.user) { // if user does not exist. check for user.
        res.status(401) // 401 = not authorized
        throw new Error('User not found')
    }
    // if users don't match to make sure login user matches the patient user
    if(patient.user.toString() !== req.user.id) {  
        res.status(401)
        throw new Error('User not autorized')
    }

    // JOI
    var fileExtension = undefined // default value
    if(req.file !== undefined) {
       fileExtension = path.extname(req.file.path).substring(1); // for profilePic checking purposes
    } 
    const { error, value } = validateEditPatient({
       fullName: req.body.fullName,
       email: req.body.email,
       contact: req.body.contact,
       dob: req.body.dob,
       profilePic: fileExtension,
    })
    if(error) {
       console.log(error);
        return res.status(403).send(error.details) // returns error array from JOI
    }
    if(req.file !== undefined) {
        profilePicUpdate = req.file.path
    } else {
        profilePicUpdate = patient.profilePic // access the path of the current patient's current profile picture
    }

    const editedPatient = await Patient.findByIdAndUpdate(req.params.id, {
        user: req.user.id,
        fullName: req.body.fullName,
        email: req.body.email,
        contact: req.body.contact,
        dob: req.body.dob,
        profilePic: profilePicUpdate, //req.file.path,
    }, {new: true}) // req.body is the body text stored in req, and new: true creates a new one if it doesnt exist yet
    res.status(200).json(editedPatient) 
})

// @desc    Delete patient
// @route   DELETE /api/patient/:id
// @access  Private
const deletePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id) // we get ID by req.params.id because id is in URL
    if(!patient) {
        res.status(400)
        throw new Error('Patient not found.')
    }

    // user check
    //const user = await User.findById(req.user.id)
    if(!req.user) { // if user does not exist. check for user.
        res.status(401) // 401 = not authorized
        throw new Error('User not found')
    }
    // if users don't match to make sure login user matches the patient user
    if(patient.user.toString() !== req.user.id) {  
        res.status(401)
        throw new Error('User not autorized')
    }

    await patient.deleteOne() 
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getPatient,
    addPatient,
    editPatient,
    deletePatient,
}