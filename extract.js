const path = require('path');

const extractFilePath = function(url) {
    let filePath;
    let fileName = 'index.html';

    if (url.length > 1) {
        fileName = url.substring(1);
    }
    console.log(`The filename is ${fileName}`);
    filePath = path.resolve(__dirname, 'app', fileName);
    return filePath;
}

module.exports = extractFilePath;
