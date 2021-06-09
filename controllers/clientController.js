const galleryItemModel = require('../models/galleryItem');
const contactModel = require('../models/contact');

const controller = {
    index:{
      GET: async function(req, res)
      {
        res.render('clientViews/index');
      },
      POST: async function(req, res)
      {
        res.redirerct('/');
      }
    },
    about:{
      GET: async function(req, res)
      {
        res.render('clientViews/about');
      }
    },
    gallery:{
      GET:async function(req, res)
      {
        let galleryItems = await galleryItemModel.find();
        res.render('clientViews/gallery', {
          galleryItems:galleryItems
        });
      }
    },
    contact:{
      GET:async function(req, res)
      {
        res.render('clientViews/contact');
      },
      POST: async function(req, res){
        try{
          let contact = new contactModel;

          contact.name = req.body.name;
          contact.email = req.body.email;
          contact.subject = req.body.subject;
          contact.message = req.body.message;
          //To add recaptcha && frontend session mf
          contact.save()
          .then(()=>{
            res.redirect('/');
          })
        }
        catch(e){
          console.log(e);
        }
      }
    },
    shop:{
      GET: async function(req, res){
        res.render('clientViews/shop');
      }
    }
}

module.exports = controller;
