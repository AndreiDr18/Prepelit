/*===============
==Utilities==
=================*/
const adminUser = require('../utilities/adminAuth');

/*===============
==MongoDb Models==
=================*/

const adminUserModel = require('../models/adminUser');

//cookies

const Cookies = require('cookies');

/*=============
==Controller==
===============*/
const controller = {
  dashboard:{
    GET: async function(req, res){
      try{
        const cookies = new Cookies(req, res);
        let user = new adminUser(cookies.get('id'), adminUserModel);

        if(await user.validate()){
          res.render('adminViews/dashboard', {
            user:user.data
          });

        }
        else res.render('adminViews/login');
      }catch(e){
        console.error(e);
      }

    },
    POST: async function(req, res){
      try{
        const cookies = new Cookies(req, res);
        let user = new adminUser(cookies.get('id'), adminUserModel);

        await user.login(req.body, cookies);
        res.redirect('/admin');
      }catch(e){
        console.error(e);
      }
    }
  },
  gallery:{
    GET: async function(req, res){

      try{
        const cookies = new Cookies(req, res);
        let user = new adminUser(cookies.get('id'), adminUserModel);

        if(await user.validate()){
          res.render('adminViews/gallery',{
            user:user.data
          });

        }
        else res.render('adminViews/login');
      }catch(e){
        console.error(e);
      }

    },
    POST: async function(req, res){
      try{
        const cookies = new Cookies(req, res);
        let user = new adminUser(cookies.get('id'), adminUserModel);

        if(await user.validate()){
          //content here

        }
        else res.render('adminViews/login');
      }catch(e){
        console.error(e);
      }
    }
  }
}

module.exports = controller;
