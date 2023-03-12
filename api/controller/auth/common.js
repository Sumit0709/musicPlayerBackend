const User = require("../../model/user");
const {expressjwt: jwt} = require("express-jwt");

exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;
    
    if(!userId){
        return res.status(401).json({
            success: false, 
            error: 'Please refresh or try again!'
        })
    }

    const user = await User.findById(userId).exec();
    if(!user){
        return res.status(404).json({
            success: false,
            error: 'User does not exist!'
        })
    }
    req.user = user;
    // console.log(user);

    next();
}

exports.isSignedIn = jwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
})

exports.isAuthenticated = async (req, res, next) => { // profile will be sent by the frontend

    let checker = req.user && req.auth && req.user._id == req.auth._id;
    if(!checker){
        console.log("ERROR AUTHENTICATION");
        return res.status(403).json({
            error: "ACCESS DENIED!"
        });
    }
    next();
}