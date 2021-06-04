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
        res.render('clientViews/gallery');
      }
    },
    contact:{
      GET:async function(req, res)
      {
        res.render('clientViews/contact');
      }
    },
    shop:{
      GET: async function(req, res){
        res.render('clientViews/shop');
      }
    }
}

module.exports = controller;
