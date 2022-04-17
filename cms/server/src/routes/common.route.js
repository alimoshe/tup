const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const productModel = require('../models/product/product.mongo');
const galleryModel = require('../models/gallery/gallery.mongo');
const commonRouter = express.Router();
var imgName = '';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        if (file) {
            const name = Date.now() + file.originalname;
            imgName = name;
            cb(null, name);
        }
    }
})
const upload = multer({storage: storage}).single('file')
commonRouter.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).json({ok: true, imageName: imgName});
        }
    });

});

commonRouter.post('/picRemove', async (req, res) => {
    console.log(req.body);
    const pics = await productModel.getAllProductPics(req.body.body);
    const picArray = pics.pictures;
    let fail = false;
    picArray.map((imageName) => {
        const absolutePath = path.join(__dirname, '..', '..', 'public', 'images', imageName);
        try {
            fs.exists((absolutePath), (exists) => {
                console.log(absolutePath);
                if (exists) {
                    fs.rm(absolutePath, () => {
                        //TODO Handle remove
                    });
                }
            });
        } catch (err) {
            fail = true;
            return res.status(404).send({error: err, ok: false});
        }
    });
    if (!fail) {
        const cleared = await productModel.clearProductPictures(pics.productId);
        return res.status(200).send({affectedProduct: cleared, ok: true});
    }
})


commonRouter.post('/getImg', (req, res)=>{
    const imageName = req.body.imageName;
    const absolutePath = path.join(__dirname, '..', '..', 'public', 'images', imageName);
    return res.status(200).send({ok: true, path : absolutePath});
})

commonRouter.get('/getImg/:id', async (req, res)=>{
    const itemId = Number(req.params.id);
    const result = await galleryModel.getBlobName(itemId);
    const absolutePath = path.join(__dirname, '..', '..', 'public', 'images', result.blobName);

    return res.status(200).sendFile(absolutePath);
})

commonRouter.post('/updateImg/:imageName/:galleryItem', async (req, res)=>{

    const imageName = req.params.imageName;
    const galleryItem = Number(req.params.galleryItem);
    const absolutePath = path.join(__dirname, '..', '..', 'public', 'images', imageName);
    const fileContent = fs.readFileSync(absolutePath);
    await galleryModel.updateGallery(galleryItem,fileContent);
    return res.status(200).send({ok: true, path : absolutePath});
})

commonRouter.get('/getImg/:id/:row', async (req, res)=>{
    const prodId = req.params.id;
    const picRow = req.params.row;
    const product = await productModel.getAllProductPics(prodId);

    return res.status(200).sendFile(path.join(__dirname, '..', '..', 'public', 'images', product.pictures[picRow]));
})

commonRouter.get('/get/:imageName', async (req, res)=>{
    return res.status(200).sendFile(path.join(__dirname, '..', '..', 'public', 'images', req.params.imageName));
})


module.exports = commonRouter;