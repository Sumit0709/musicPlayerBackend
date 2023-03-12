const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: { // Optional
        type: String,
        trim: true        
    },
    artist: { // Optional
        type: String,
        trim: true
    },
    scope: {
        type: Number,
        default: 0, // 0 for Private, 1 for public
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    coverPhoto: {
        type: Buffer,
        required: true
    },
    coverPhotoExtension: {
        type: String,
        required: true
    },
    audio: {
        type: Buffer,
        required: true
    },
    duration: {
        type: Number
    },
    isLiked: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});



module.exports = mongoose.model('Audio', userSchema)