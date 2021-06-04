const express = require('express');
const app = express();


/*==================
=====Path Handler=======
====================*/


const path = require('path')


/*==================
=====Env Vars=======
====================*/

require('dotenv').config({path:path.normalize(__dirname + '/.env')});

/*==================
=====Mongoose=======
====================*/

const mongoose = require('mongoose');
mongoose.connect(process.env['MONGO_URI'], {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
  console.log('Succesfully connected to database');
})
.catch(err=>{
  console.log('Issue connecting to database \n' + err);
})


/*==================
=====Environment=======
====================*/

const port = 27017;
app.listen(27017, ()=>{
  console.log(`Listening on port ${port}`);
});

app.set('view engine', 'ejs');
app.use('/', express.static(path.normalize(__dirname + '/public/client')));
app.use('/admin', express.static(path.normalize(__dirname + '/public/admin')));
app.use(express.urlencoded({extended:true}));

/*==================
=====Routing=======
====================*/

const clientRouter = require(path.normalize(__dirname + '/routes/clientRouter.js'));
const adminRouter = require(path.normalize(__dirname + '/routes/adminRouter.js'));

app.use('/', clientRouter);
app.use('/admin', adminRouter);
