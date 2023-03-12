const User = require("../../model/user");
const Audio = require('../../model/audio');

exports.getAllAudio = async(req, res) => {

    // return res.status(500).json({
    //     success: false,
    //     error: 'Something went wrong while fetching audios data. Please retry!'
    // })

    const usedId = req.user._id;

    const numberOfAudioFiles = req.user.audioFiles.length;
    const audioFiles = req.user.audioFiles.reverse();

    let audios = [];

    for(let i=0; i<numberOfAudioFiles; i++){
        await Audio.findById(audioFiles[i]).exec()
            .then(file => {
                if(file){
                    const audio = {
                        audioId: file._id,
                        title: file.title,
                        artist: file.artist,
                        description: file.description,
                        isLiked: file.isLiked
                    }
                    // console.log(audio);
                    audios.push(audio);
                }
            })
            .catch(err => {
                return res.status(500).json({
                    success: false,
                    error: 'Something went wrong while fetching audios data. Please retry!'
                })
            })
    }

    // console.log(audios);

    return res.status(200).json({
        success: true,
        message: 'All audio has been fetched successfully',
        audios: audios
    })

}