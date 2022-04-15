const express = require('express');
const galleryRouter = express.Router();
const galleryModel = require('../models/gallery/gallery.mongo');


galleryRouter.get('/', async (req, res)=>{
    res.status(200).send(galleryModel.getAllGalleryData());
})

galleryRouter.get('/count', async (req, res)=>{
    res.status(200).send(galleryModel.getGalleryCountItems());
})

galleryRouter.post('/', async (req, res) => {
    console.log(req.body);
    res.status(200).send(galleryModel.galleryItemCreate(req.body));
})
module.exports = galleryRouter;