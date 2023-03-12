const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require("../../model/user")
const UserName = require("../../model/userName")
const { validName, validUserName, validEmail, validPassword } = require("../../validation")

exports.register = async(req, res) => {

    if(!validName(req.body.name)){
        return res.status(400).json({
            success: false,
            error: 'You have entered an invalid Name!'
        })
    }
    else if(!validUserName(req.body.userName)){
        return res.status(400).json({
            success: false,
            error: 'You have entered an invalid User Name!'
        })
    }
    else if(!validEmail(req.body.email)){
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
    else if(req.body.password !== req.body.confirmPassword){
        return res.status(400).json({
            success: false,
            error: 'Confirm Password should match Password!'
        })
    }
    else{
        // Request is valid, do operations on it.

        const isUserNameUsed = await UserName.findOne({userName: req.body.userName}).exec();

        if(isUserNameUsed){
            return res.status(409).json({
                success: false,
                error: 'User name not available, Please try something else!'
            })
        }
        // User name is available, create user
        const salt = 10;
        try{
            
            console.log('SALT = ', salt)
            bcrypt.hash(req.body.password,salt,async (err, hash) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: false,
                        error: "Something went wrong! Please retry. If error persist, please contact admin."
                    })
                }
                else{
                    console.log('Password encrypted');
                }
                
                // Password has been encrypted successfully, we can proceed further

                const userId = new mongoose.Types.ObjectId();
                console.log(userId);

                const userName = new UserName({
                    userName: req.body.userName,
                    userId: userId
                })

                const isUserNameSaved = await userName.save();
                console.log(isUserNameSaved);
                
                if(!isUserNameSaved){
                    return res.status(500).json({
                        success: false,
                        error: "Something went wrong! Please retry. If error persist, please contact admin."
                    })
                }

                const user = new User({
                    _id: userId,
                    name: req.body.name,
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hash
                })

                user.save()
                    .then(result => {
                        if(result){
                            const userId = result._id;
                            console.log(userId);
                            return res.status(200).json({
                                success: true,
                                message: 'User has been created successfully.'
                            })
                        }
                        else{
                            return res.status(500).json({
                                success: false,
                                error: "Something went wrong! Please retry. If error persist, please contact admin."
                            })
                        }
                    })
                    .catch(err => {
                        return res.status(500).json({
                            success: false,
                            error: "Something went wrong! Please retry. If error persist, please contact admin."
                        })
                    })

            })
        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                error: "Something went wrong! Please retry. If error persist, please contact admin."
            })
        }


    }

}