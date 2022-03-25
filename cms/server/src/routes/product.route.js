const express = require('express');
const productModel = require('../models/product/product.mongo');
const categoryModel = require('../models/productCatgory/category.model');
const productRouter = express.Router();

productRouter.get('/', async (req, res)=>{
    const _products = await productModel.getAllProduct();
    return res.status(200).send(_products);
});

productRouter.get('/all', async (req, res)=>{
    const _products = await productModel.getProductsWithoutFilter();
    return res.status(200).send(_products);
});

productRouter.post('/', async (req, res) => {
   if(req.body.productId){
       const products = await productModel.getAllProduct();
       const category = await categoryModel.getCategoryById(req.body.categoryId);

       if(category){
           req.body.categoryTitle = category.title;
           req.body.productId = products.length + 1;
           console.log(req.body);
           const newProduct = await productModel.createProduct(req.body);
           res.status(200).send({ok:true, product : newProduct});
           //res.send({ok:true});
       }

   }
});

productRouter.post('/rm', async (req, res)=>{
    console.log(req.body);
    if(req.body.body.dataTarget){
        try {

            await productModel.expireProduct(req.body.body.dataTarget);
            res.status(200).send(req.body);
        }catch (err){
            res.status(403).send({ok:false, error:err});
        }
    }
})
module.exports = productRouter;