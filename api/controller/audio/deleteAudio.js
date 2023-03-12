const audio = require("../../model/audio");
const User = require("../../model/user");


exports.deleteAudio = async(req, res) => {

    const audioId = req.params.audioId;
    console.log(audioId);

    if(!audioId){
        return res.status(403).json({
            success: false,
            error: 'Invalid request'
        })
    }

    if(!req.user._id.equals(req.audio.ownerId)){
        return res.status(401).json({
            success: false,
            error: 'you dont have this right.'
        })
    }

    await User.findByIdAndUpdate(req.user._id,{
        $pull: {
            audioFiles: audioId
        }
    },{
        new: true
    }).exec()
    .then(result => {
        
        if(result){
            audio.findByIdAndDelete(req.params.audioId, {new: true}).exec()
            .then(audioFile => {

                if(audioFile){
                    return res.status(200).json({
                        success: true,
                        message: 'Audio file deleted successfully'
                    })
                }
                else{ 
                    return res.status(206).json({
                        success: true,
                        error: 'Partially deleted. Something went wrong while deleting file!'
                    })
                }
            })
            .catch(err =>{
                console.log(err);
                return res.status(206).json({
                    success: true,
                    error: 'Partially deleted. Something went wrong while deleting file!'
                })
            })
        }
        else{ 
            return res.status(404).json({
                success: false,
                error: "Audio instance not deleted. Please try again!"
            })
        }

    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: 'Something went wrong!'
        })
    })


    

}