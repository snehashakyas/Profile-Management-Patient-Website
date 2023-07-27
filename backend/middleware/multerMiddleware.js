//const multer = require('multer')
//const path = require('path') // for filename 

//const storage = multer.diskStorage({
//    destination: (req, file, cb) => {
//        cb(null, 'uploads')
//    },
//    filename: (req, file, cb) => {
//        console.log(file)
//        cb(null, Date.now() + path.extname(file.originalname))
//    }
//})

//const imageUpload = multer({storage: storage})

//module.exports = imageUpload