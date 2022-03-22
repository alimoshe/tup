const express = require('express');
const {getAllProducts} = require('../../models/product/product.mongo');

const productsRouter = express.Router();

productsRouter.get('/', getAllProducts());

module.exports = productsRouter;