const express = require('express');
const router = express.Router();

const controller = require('../controllers/adminController');

const extensionVerifier = require('../utilities/extensionVerifier');

const path = require('path');

/*=============
====Multer====
===============*/

const multer = require('multer');

const galleryStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.normalize(__dirname + '/../public/shared/galleryItems'));
  },
  filename: function(req, file, cb) {

    if (extensionVerifier.IMG(file)) {
      fileExt = file.mimetype.slice(6);
      req.success = true;
      req.upFileName = Date.now();
      req.upFileExt = fileExt;
      console.log(fileExt);
      cb(null, req.upFileName + `.${req.upFileExt}`);
    }
    else{
      req.success = false;
      cb(null, 'Wrong');
    }
  }
});

let galleryUpload = multer({
  storage: galleryStorage
});

/*=============
===Dashboard===
===============*/
router.get('/', controller.dashboard.GET);
router.post('/', controller.dashboard.POST);

/*=============
====Gallery====
===============*/

router.get('/gallery', controller.gallery.GET);
router.post('/gallery', controller.gallery.GET);

router.post('/gallery/upload', galleryUpload.single('photo'), controller.gallery.upload.POST);
router.post('/gallery/edit', controller.gallery.edit.POST);
router.get('/gallery/delete', controller.gallery.delete.GET);

module.exports = router;
