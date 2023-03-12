const audio = require("../../model/audio");


exports.getCoverPhoto = async(req, res) => {

    const audioId = req.params.audioId;
    if(!audioId){
        return res.status(403).json({
            success: false,
            error: 'Invalid request'
        })
    }
    audio.findById(audioId).exec()
        .then(audioFile => {
            // audioFile.coverPhoto = undefined;
            // console.log(audioFile.title);
            
            if(!req.user._id.equals(audioFile.ownerId)){
                return res.status(401).json({
                    success: false,
                    error: 'you dont have this right.'
                })
            }

            if(audioFile){

                res.set("Content-Type", `Image/${audioFile.coverPhotoExtension}`);
                return res.send(audioFile.coverPhoto);

                // return res.status(200).json({
                //     success: true,
                //     coverPhoto: audioFile.coverPhoto
                // })
            }
            else{
                return res.status(404).json({
                    success: false,
                    error: "File not found"
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