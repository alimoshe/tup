const express = require('express');
const productGalleryMongo = require('../models/productGallery/productGallery.mongo');
const productGalleryRouter = express.Router();

productGalleryRouter.get('/', async (req, res)=>{
    return res.status(200).send(await productGalleryMongo.getAllProductGalleryItems({}));
});

productGalleryRouter.post('/',async (req, res)=>{
    const createResult = await productGalleryMongo.createProductGalleryItem(req.body);
    if(createResult.itemId === -1){
        return res.status(200).send({error : 1, msg : 'Product with this Gallery Item is Exist'});
    }
    return res.status(200).send(createResult);
});

productGalleryRouter.get('/ce/:prodId/:galleryId',async (req, res)=>{
    const productId = req.params.prodId;
    const galleryItemId = req.params.galleryId;

    const checkResult = await productGalleryMongo.getGalleryItemsByProductId(productId,galleryItemId);

});


module.exports = productGalleryRouter;