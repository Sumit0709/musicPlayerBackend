const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../../model/user');
const { validEmail, validPassword } = require("../../validation")


exports.login = async (req, res) => {
    
    if(!validEmail(req.body.email)){
        return res.status(400).json({
            success: false,
            error: 'You have entered an invalid Email!'
        })
    }
    else if(!validPassword(req.body.password)){
        return res.status(400).json({
            success: false,
            error: 'You have entered an invalid Password!'
        })
    }

    const user = await User.findOne({email: req.body.email}).exec();

    if(!user){
        return res.status(404).json({
            success: false,
            error: 'User corresponding to this email is not found, please verify your email and retry.'
        })
    }

    bcrypt.compare(req.body.password, user.password, (err, match) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                error: "Something went wrong! Please retry. If error persist, please contact admin."
            })
        }
        else if(match){
            // Password matched successfully, proceed further

            const token = jwt.sign({
                email: user.email,
                _id: user._id,
                createdAt: user.createdAt
            },process.env.SECRET,{
                expiresIn: "999d"
            });

            // res.cookie("LOGIN",token,{expires: new Date(Date.now() +60*1000), httpOnly: false});
            // res.cookie("sessionId",user.sessionId)

            return res.status(200).json({
                success: true,
                userId: user._id,
                token: token,
                message: 'Login successfull.'
            })
        }
        else{
            // Password didn't match
            return res.status(409).json({
                success: false,
                error: "Password didn't match"
            })
        }
    })


}