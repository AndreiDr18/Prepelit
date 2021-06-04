const express = require('express');
const router = express.Router();

const path = require('path');

const controller = require(path.normalize(__dirname + '/../controllers/clientController.js'));

/*==================
=====Routing=======
====================*/


router.get('/', controller.index.GET);
router.get('/about', controller.about.GET);
router.get('/gallery', controller.gallery.GET);
router.get('/contact', controller.contact.GET);
router.get('/shop', controller.shop.GET);

module.exports = router;
