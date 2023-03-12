const multer = require('multer');


const storage = multer.memoryStorage();
const myFileFilter = (req, file, cb) => {

    const allowedMIME = ['audio/mpeg'];
    if(allowedMIME.includes(file.mimetype)){
        return cb(null, true)
    }
    console.log("DIDN'T MATCH", file.mimetype)
    return cb({
        success: false,
        error: "Please send a valid mp3 file!"
    }, false)
}

exports.upload = multer({
    storage: storage, 
    fileFilter: myFileFilter,
    limits: {
        fieldSize: 4194304, // 4Mb for cover photo
        fileSize: 10485760 //10 Mega Bytes  
    },
})

