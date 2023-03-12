const path = require('path')

exports.validName = (name) => {
    const re = /^[A-Z ]{3,40}$/i;
    if ( re.test(name) ) {return true}
    else { return false}
}

exports.validEmail = (email) => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i;
    if ( re.test(email) ) {return true}
    else { return false}
}

exports.validUserName = (userName) => {
    const re = /^[_ a-zA-Z0-9]{2,30}$/; 
    // can contain alphanumeric and underscore(_)
    // min 2 char, max 30 char

    if(re.test(userName)){
        for(let i=0; i<userName.length; i++){
            if(userName[i]==' '){
                return false
            }
        }
        return true
    }
    else {
        return false
    }
}

exports.validPassword = (password) => {
    if(password == null || password == undefined || password.length<6 || password.length>30){
        return false;
    }
    password = password.trim();
    let lower=0, upper=0, numeric=0, special=0;
    let invalid = false;
    const specialChar = "!@#$%^&*()_/?.><,:;'{}\"[]+=~`";
    // const specialChar = "@.!&";
    const a = 97, A=65, o=48;

    for(let i=0; i<password.length; i++){
        let ch = password.charCodeAt(i);

        if(ch-a>=0 && ch-a<=25){
            lower += 1;
        }
        else if(ch-A>=0 && ch-A<=25){
            upper += 1;
        }
        else if(ch-o>=0 && ch-o<=9){
            numeric += 1;
        }
        else{
            let found = false;
            for(let j=0; j<specialChar.length; j++){
                if(password[i] == specialChar[j]){
                    found = true;
                    special += 1;
                    break;
                }
            }
            if(!found) {
                return false
            };
        }
    }


    if(invalid || (lower==0 && upper==0) || numeric==0){
        return false
    }

    return true
}

exports.validCoverPhoto = (coverPhotoURI) => {

    if(!coverPhotoURI){
        return {
            success: false,
            error: 'Cover Photo is not available, Please choose a cover photo.'
        }
    }

    const photoExt = coverPhotoURI.match(/[^:]\w+(?=;|,)/)[0].split('/').pop();
    const validFileExt = ['png','jpg','jpeg'];

    if(!validFileExt.includes(photoExt)){
        return {
            success: false,
            error: "Select a valid image file!"
        }
    }

    const buffer = Buffer.from(coverPhotoURI.split(',')[1], 'base64');
    const photoSize = buffer.length;
    const maxFileSize = 3145728; // 3 Mega Byte

    if(photoSize> maxFileSize){
        return {
            success: false,
            error: "Maximum allowed file size is 3 MB"
        }
    }

    return {
        success: true,
        fileExtension: photoExt
    }
}