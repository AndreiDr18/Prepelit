let extensions = ['JPG', 'JPEG', 'PNG', 'GIF'];


let checkExtension = {
  IMG: function(file){
    let fileMimetype = file.mimetype.slice(6).toUpperCase();

    for(index in extensions){
      console.log(fileMimetype + ' == ' + extensions[index]);
      if(fileMimetype == extensions[index]) return true;
    }
    return false;
  }
}

module.exports = checkExtension;
