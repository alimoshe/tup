const express = require('express');
const productModel = require('../models/product/product.mongo');
const categoryModel = require('../models/productCatgory/category.model');
const utility = require('../util/util');
const productRouter = express.Router();

productRouter.get('/:page/:limit', async (req, res)=> {
    const query = {
        pageCount: req.params.page || 1,
        limitCount: req.params.limit || 10
    }
    const pagination = utility.getPagination(query);
    const paginated = await productModel.getAllPaginateProduct(pagination);
    return res.status(200).send({products: paginated});

});

productRouter.get('/prodLen', async (req, res)=>{
    const _products = await productModel.getAllProduct();
    res.status(200).send({dataLength : _products.length});

});

productRouter.get('/:name', async (req, res)=>{
    if(req.params.name) {
        const _products = await productModel.getAllProduct();
        return res.status(200).send(_products);
    }
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
           const newProduct = await productModel.createProduct(req.body);
           res.status(200).send({ok:true, product : newProduct});

       }

   }
});

productRouter.post('/rm', async (req, res)=>{

    if(req.body.productId){
        try {
            const removed = await productModel.expireProduct(req.body.productId);
            res.status(200).send({ok:true, data : removed});
        }catch (err){
            res.status(403).send({ok:false, error:err});
        }
    }
})

productRouter.post('/ed', async (req, res)=>{
    console.log(req.body.productId);
    if(req.body.productId){
        try {
            const updated = await productModel.updateProduct(req.body.productId, req.body.prod);
            res.status(200).send({ok:true, data : updated});
        }catch (err){
            res.status(403).send({ok:false, error:err});
        }
    }
})

productRouter.post('/imgAssign', async (req, res)=>{
    if(req.body.image && req.body.prodId) {
        try {
            await productModel.assignImage(req.body.image, req.body.prodId);
            return res.status(200).send({
                image: req.body.image,
                selectedProductId: req.body.prodId
            });
        }catch (err){
            return res.status(403).send({ok: false, error:err});
        }

    }
})
module.exports = productRouter;