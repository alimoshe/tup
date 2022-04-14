const express = require('express');
const galleryRouter = express.Router();
const galleryModel = require('../models/gallery/gallery.mongo');
galleryRouter.get('/', async (req, res)=>{
    res.status(200).send(galleryModel.getAllGalleryData());
})

module.exports = galleryRouter;