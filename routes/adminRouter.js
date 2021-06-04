const express = require('express');
const router = express.Router();

const controller = require('../controllers/adminController');

/*=============
===Dashboard===
===============*/
router.get('/', controller.dashboard.GET);
router.post('/', controller.dashboard.POST);

/*=============
==Gallery==
===============*/

router.get('/gallery', controller.gallery.GET);
router.post('/gallery', controller.gallery.GET);

module.exports = router;
