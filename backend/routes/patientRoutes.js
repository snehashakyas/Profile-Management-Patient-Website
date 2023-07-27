const express = require('express')
const router = express.Router()
const { getPatient, addPatient, editPatient, deletePatient } = require('../controllers/patientController')

const { protect } = require('../middleware/authMiddleware')

const multer = require('multer')
const path = require('path') // for filename 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

// different routes: get, post, put, delete
router.route('/').get(protect, getPatient).post(protect, upload.single("profilePic"), addPatient) // get and create with / route. protect middleware enables authentication of token to take place
router.route('/:id').put(protect, upload.single("profilePic"), editPatient).delete(protect, deletePatient) // update and delete with /:id route

module.exports = router