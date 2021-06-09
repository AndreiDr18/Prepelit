const path = require('path');
let extensions = ['JPG', 'JPEG', 'PNG', 'GIF'];


let checkExtension = {
  IMG: function(file){
    let extName = path.extname(file.originalname).toUpperCase();
    let fileMimetype = file.mimetype.slice(6).toUpperCase();

    if(extName[0] == '.') extName = extName.substr(1);

    for(index in extensions){
      console.log(extName + ' == ' + extensions[index]);
      console.log(fileMimetype + ' == ' + extensions[index]);
      if((extName == `${extensions[index]}`) && (fileMimetype == extensions[index])) return true;
    }
    return false;
  }
}

module.exports = checkExtension;
