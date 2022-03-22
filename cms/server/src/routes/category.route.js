const express = require('express');
const categoryModel = require('../models/productCatgory/category.model');
const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res)=>{
    return await categoryModel.getAllCategories();
});
categoryRouter.post('/', async (req, res)=> {

})

module.exports = categoryRouter;