const mongoose = require('mongoose')

const userNameSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});



module.exports = mongoose.model('UserName', userNameSchema)