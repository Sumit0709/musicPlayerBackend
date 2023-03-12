const { validCoverPhoto } = require("../../validation");
const mongoose = require('mongoose');
const Audio = require('../../model/audio');
const User = require("../../model/user");

exports.uploadAudio = async(req, res) => {

    // console.log(req.body);
    // console.log(req.file);

    const isValidCoverPhoto = validCoverPhoto(req.body.coverPhoto);
    if(!isValidCoverPhoto.success){
        return res.status(403).json(isValidCoverPhoto)
    }

    // Converting coverPhoto dataURI to binary Data
    const base64Data = req.body.coverPhoto.replace(/^data:image\/\w+;base64,/, '');
    const coverPhotoBinaryData = Buffer.from(base64Data, 'base64');

    // console.log(binaryData);
    // return;
    
    const userId = req.user._id;
    const newAudioId = new mongoose.Types.ObjectId();


    const newAudio = new Audio({
        _id: newAudioId,
        title: req.body.title,
        description: req.body.description,
        artist: req.body.artist,
        ownerId: userId,
        coverPhoto: coverPhotoBinaryData,
        coverPhotoExtension: isValidCoverPhoto.fileExtension,
        audio: req.file.buffer,
        duration: req.body.duration
    })

    newAudio.save()
        .then(result => {
            if(result){
                User.findByIdAndUpdate(userId,{
                    $push: {
                        audioFiles: newAudioId
                    }
                },{new: true}).exec()
                .then(result => {
                    if(result){
                        return res.status(200).json({
                            success: true,
                            error: "Your audio file has been successfully uploaded",
                            audioId: result._id
                        })
                    }else{
                        return res.status(502).json({
                            success: true,
                            error: 'Something went wrong! Please try again.'
                        })
                    }
                })
                .catch(err => {
                    return res.status(500).json({
                        success: false,
                        error: 'Something went wrong!, please retry, if error persists please contact admin'
                    })
                })
            }
            else{
                return res.status(502).json({
                    success: false,
                    error: 'Failed to save audio.'
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                error: 'Something went wrong!, please retry, if error persists please contact admin'
            })
        })

}