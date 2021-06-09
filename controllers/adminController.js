/*===============
==Utilities==
=================*/
const adminUser = require('../utilities/adminAuth');

/*===============
==MongoDb Models==
=================*/

const adminUserModel = require('../models/adminUser');
const galleryItemModel = require('../models/galleryItem');

/*===============
=====Cookies=====
=================*/

const Cookies = require('cookies');

/*===============
==File handling==
=================*/

const fs = require('fs');

/*===============
==Path handling==
=================*/

const path = require('path');

/*===============
====Controller===
=================*/

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

          const galleryItems = await galleryItemModel.find();
          res.render('adminViews/gallery',{
            user:user.data,
            galleryItems: galleryItems
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
          res.redirect('/');

        }
        else res.render('adminViews/login');
      }catch(e){
        console.error(e);
      }
    },
      upload:{
        POST: async function(req, res){
          try{
            const cookies = new Cookies(req, res);
            let user = new adminUser(cookies.get('id'), adminUserModel);
            let galleryItem = new galleryItemModel;



            if(await user.validate()){
              if(req.success){
                galleryItem.category = req.body.category;
                galleryItem.ext = req.upFileExt;
                galleryItem =await galleryItem.save();

                fs.rename(path.normalize(__dirname + `/../public/shared/galleryItems/${req.upFileName}.${req.upFileExt}`),
                          path.normalize(__dirname + `/../public/shared/galleryItems/${galleryItem._id}.${req.upFileExt}`),
                          (err)=>{
                            if(err) console.log(err);
                          });

                res.redirect('/admin/gallery');
            }else{
              fs.unlinkSync(path.normalize(__dirname + `/../public/shared/galleryItems/Wrong`));
              res.redirect('/admin/gallery');
            }
            }
            else res.render('adminViews/login');
          }catch(e){
            console.log(e);
          }
        }
      },
      edit:{
        POST: async function(req, res){
          try{
            const cookies = new Cookies(req, res);
            let user = new adminUser(cookies.get('id'), adminUserModel);

            if(await user.validate()){
              let item = await galleryItemModel.findById(`${req.query.id}`);
              item.category = req.body.category;
              item.save()
              .then(()=>{
                res.redirect('/admin/gallery');
              })

            }
            else res.render('adminViews/login');
          }catch(e){
            console.log(e);
          }
        }
      },
      delete:{
        GET: async function(req, res){
          try{
            const cookies = new Cookies(req, res);
            let user = new adminUser(cookies.get('id'), adminUserModel);

            if(await user.validate()){
              let item = await galleryItemModel.findById(`${req.query.id}`);
              fs.unlinkSync(path.normalize(__dirname + `/../public/shared/galleryItems/${item._id}.${item.ext}`));
              galleryItemModel.findByIdAndDelete(`${req.query.id}`)
              .then(()=>{
                res.redirect('/admin/gallery');
              })

            }
            else res.render('adminViews/login');
          }catch(e){
            console.log(e);
          }
        }
      }
  }
}

module.exports = controller;
