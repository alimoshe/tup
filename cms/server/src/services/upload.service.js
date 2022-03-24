const fs = require('fs');
const path = require('path');

function copyImage(source, callback){
    const baseFileName = path.basename(source);
    fs.copyFile(source,
        path.join(__dirname,'..', 'public', 'images', baseFileName), callback);
}

module.exports = {
    copyImage,
}