


exports.logout = async (req, res)=>{
    // res.clearCookie("musicPlayer",{path: '/'});

    console.log("LOGOUT")

    return res.status(200).json({
        success: true,
        message : "Logout successfull."
    });
}