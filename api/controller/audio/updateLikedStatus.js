const audio = require("../../model/audio");


exports.updateLikedStatus = async(req, res) => {

    const audioId = req.params.audioId;
    if(!audioId){
        return res.status(403).json({
            success: false,
            error: 'Invalid request'
        })
    }

    const liked = req.body.isLiked;

    if(!req.user._id.equals(req.audio.ownerId)){
        return res.status(401).json({
            success: false,
            error: 'you dont have this right.'
        })
    }

    audio.findByIdAndUpdate(audioId,{isLiked: liked}, {new: true}).exec()
        .then(audioFile => {
            // audioFile.coverPhoto = undefined;
            // console.log(audioFile.title);

            if(audioFile){
                return res.status(200).json({
                    success: true,
                    message: 'Liked status updated successfully'
                })
            }
            else{ 
                return res.status(404).json({
                    success: false,
                    error: "Something went wrong"
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