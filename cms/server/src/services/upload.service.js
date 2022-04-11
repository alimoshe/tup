const fs = require('fs');
const path = require('path');

function copyImage(source, callback){
    const baseFileName = path.basename(source);
    fs.copyFile(source,
        path.join(__dirname,'..', 'public', 'images', baseFileName), callback);
}

function convertImageToPath(imageName){
    const baseFileName = path.basename(imageName);
}
module.exports = {
    copyImage,
    convertImageToPath,
}