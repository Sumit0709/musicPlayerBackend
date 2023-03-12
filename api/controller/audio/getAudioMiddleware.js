const audio = require("../../model/audio");


exports.getAudioMiddleware = async(req, res, next) => {

    const audioId = req.params.audioId;
    if(!audioId){
        return res.status(403).json({
            success: false,
            error: 'Invalid request'
        })
    }

    console.log(audioId)

    audio.findById(audioId).exec()
        .then(audioFile => {
            

            if(audioFile){
                req.audio = audioFile;
                next()
            }
            else{
                return res.status(404).json({
                    success: false,
                    error: "Audio File not found!"
                })
            }
        })
        .catch(err =>{
            console.log(err);
            return res.status(500).json({
                success: false,
                error: 'Something went wrong!'
            })
        })

}