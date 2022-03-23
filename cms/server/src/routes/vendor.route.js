const express = require('express');
const vendorModel = require('../models/vendor/vendor.model');

const vendorRouter = express.Router();

vendorRouter.get('/', async (req, res)=>{
    res.status(200).send(await vendorModel.getAllVendors());
})

vendorRouter.post('/', async (req, res)=>{
    res.send(await vendorModel.createVendor(req.body));
})
module.exports = vendorRouter;