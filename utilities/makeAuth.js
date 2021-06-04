const mongoose = require('mongoose');
const adminUserModel = require('../models/adminUser');
const hasher = require('crypto-js');

mongoose.connect('mongodb+srv://andreidr:12321@cluster0.z0sa2.mongodb.net/Prepelit?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
  console.log('Succesfully connected to database');
})
.catch(err=>{
  console.log('Issue connecting to database \n' + err);
})

let myArgs = process.argv.slice(2);

let adminUser = new adminUserModel;

adminUser.username = myArgs[0];
adminUser.email = myArgs[1];
adminUser.password = hasher.SHA256(myArgs[2]);

adminUser.save()
.then(()=>{
  process.exit();
})
.catch(e=>{
  console.error(e);
  process.exit();
})
