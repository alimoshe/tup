const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path =  require('path');
const productModel = require('../models/product/product.mongo');
const commonRouter = express.Router();
var imgName = '';
const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename:  (req, file, cb) => {
        if(file) {
            const name = file.originalname;
            imgName = name;
            cb(null, name);
        }
    }
})
const upload = multer({ storage: storage }).single('file')
commonRouter.post('/upload',(req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }else{
            return res.status(200).json({ok:true, imageName:imgName});
        }
    });

});

commonRouter.post('/picRemove',async (req, res)=>{
    console.log(req.body);
    const pics = await productModel.getAllProductPics(req.body.body);
    const picArray = pics.pictures;
    let fail = false;
    picArray.map((imageName) => {
        const absolutePath = path.join(__dirname,'..','..','public','images', imageName );
        try {
            fs.exists((absolutePath), (exists) => {
                console.log(absolutePath);
                if (exists) {
                    fs.rm(absolutePath, () => {
                        //TODO Handle remove
                    });
                }
            });
        }catch (err){
            fail = true;
            return res.status(404).send({error : err, ok:false});
        }
    });
    if(!fail) {
        const cleared = await productModel.clearProductPictures(pics.productId);
        return res.status(200).send({affectedProduct : cleared, ok: true});
    }
})

module.exports = commonRouter;