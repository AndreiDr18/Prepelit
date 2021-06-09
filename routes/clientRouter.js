const express = require('express');
const router = express.Router();

const path = require('path');

const controller = require(path.normalize(__dirname + '/../controllers/clientController.js'));

/*==================
=====Routing=======
====================*/

//GET
router.get('/', controller.index.GET);
router.get('/about', controller.about.GET);
router.get('/gallery', controller.gallery.GET);
router.get('/contact', controller.contact.GET);
router.get('/shop', controller.shop.GET);

//POST

router.post('/contact', controller.contact.POST);

module.exports = router;
