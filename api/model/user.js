const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true        
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    audioFiles: [{
        type: mongoose.Types.ObjectId,
        ref: 'Audio'
    }],
    theme: {
        type: Number,
        default: 0, // 0 for light theme and 1 for dark theme    
    }
},{
    timestamps: true
});



module.exports = mongoose.model('User', userSchema)