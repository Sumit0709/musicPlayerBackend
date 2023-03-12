const fs = require('fs');
const path = require('path');
const stream = require('stream');


const Audio = require("../../model/audio")


exports.getAudio = async(req, res) => {

    const audioId = req.params.audioId;
    // console.log(audioId);

    // audio.findById(audioId).exec()
    //     .then(audioFile => {
    //         return res.status(200).json({audio: audioFile.audio});
    //     })
    //     .catch(err => {
    //         return res.status(500).json({
    //             success: false,
    //             error: 'Something went wrong!, please retry, if error persists please contact admin'
    //         })
    //     })


    //

    // Find the audio file in the database
    const audio = await Audio.findById(audioId).exec()

    if(!req.user._id.equals(audio.ownerId)){
        return res.status(401).json({
            success: false,
            error: 'you dont have this right.'
        })
    }

    if (!audio) {
        return res.status(404).json({
            success: false,
            error: 'Audio file not found'
        });
    }

    const fileSize = audio.audio.length;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunkSize = (end - start) + 1;
        const headers = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'audio/mpeg',
        };

        res.writeHead(206, headers);
        const bufferStream = new stream.PassThrough();
        bufferStream.end(audio.audio.slice(start, end + 1));
        bufferStream.pipe(res);
    } else {
        const headers = {
        'Content-Length': fileSize,
        'Content-Type': 'audio/mpeg',
        };

        res.writeHead(200, headers);
        const bufferStream = new stream.PassThrough();
        bufferStream.end(audio.audio);
        bufferStream.pipe(res);
    }
}