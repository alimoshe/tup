const express = require('express');
const categoryModel = require('../models/productCatgory/category.model');
const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res)=>{
    const allCategories = await categoryModel.getAllCategories();
    res.status(200).send(allCategories);
});
categoryRouter.post('/', async (req, res)=> {
    if(!req.body.title){
        return res.status(403).send({
            ok : false,
            error:'some required information is missing',
        })
    }
    try {
        const createdCategory = await categoryModel.createCategory(req.body);
        res.status(200).send(createdCategory);
    }catch (err){
        res.status(403).send({
            ok:false,
            error : err,
        })
    }
})

module.exports = categoryRouter;