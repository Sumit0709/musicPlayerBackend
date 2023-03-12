const express = require('express');
const { deleteAudio } = require('../controller/audio/deleteAudio');
const { getAllAudio } = require('../controller/audio/getAllAudio');
const { getAudio } = require('../controller/audio/getAudio');
const { getAudioMiddleware } = require('../controller/audio/getAudioMiddleware');
const { getCoverPhoto } = require('../controller/audio/getCoverPhoto');
const { upload } = require('../controller/audio/multerMiddleware');
const { updateLikedStatus } = require('../controller/audio/updateLikedStatus');
const { uploadAudio } = require('../controller/audio/uploadAudio');
const { getUser, isSignedIn, isAuthenticated } = require('../controller/auth/common');
const router = express.Router();


router.post('/uploadAudio/:userId',getUser, isSignedIn, isAuthenticated, upload.single('audioFile'), uploadAudio);

router.get('/getAllAudio/:userId', getUser, isSignedIn, isAuthenticated, getAllAudio);
router.get('/getCoverPhoto/:userId/:audioId', getUser, getCoverPhoto);
router.get('/getAudio/:userId/:audioId', getUser, getAudio);

router.put('/updateLikedStatus/:userId/:audioId',getUser, isSignedIn, isAuthenticated, getAudioMiddleware, updateLikedStatus)

router.delete('/deleteAudio/:userId/:audioId', getUser, isSignedIn, isAuthenticated, getAudioMiddleware, deleteAudio);

module.exports = router;