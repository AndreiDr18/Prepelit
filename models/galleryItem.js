const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const galleryItem = new Schema({
  category:{
    type: [String],
    required:true
  },
  ext:{
    type:String,
    required:true
  }
},{timestamps:true});

module.exports = mongoose.model('galleryitem', galleryItem);
