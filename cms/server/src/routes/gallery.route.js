const express = require('express');
const galleryRouter = express.Router();
const galleryModel = require('../models/gallery/gallery.mongo');


galleryRouter.get('/', async (req, res)=>{
    return res.status(200).send(await galleryModel.getAllGalleryData());
});

galleryRouter.get('/count', async (req, res)=>{
    return res.status(200).send(await galleryModel.getGalleryCountItems());
});

galleryRouter.post('/', async (req, res) => {
    await galleryModel.galleryItemCreate(req.body)
    return res.status(200).json(req.body);
});

galleryRouter.get('/getImg/:id', async (req, res)=>{
    const imageID = Number(req.params.id);
    console.log(imageID);
    return res.status(200).send(await galleryModel.getGalleryItemBlobData(imageID));
})

galleryRouter.get('/sec/:sectionId', async (req, res)=>{
    console.log(req.params.sectionId);
    return res.status(200).send(await galleryModel.getGalleryItemsBySectionId(req.params.sectionId));
});
module.exports = galleryRouter;