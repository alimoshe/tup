const express = require('express');
const vendorModel = require('../models/vendor/vendor.model');

const vendorRouter = express.Router();

vendorRouter.get('/', async (req, res)=>{
    return res.status(200).send(await vendorModel.getAllVendors());
})

vendorRouter.post('/', async (req, res)=>{
    return res.send(await vendorModel.createVendor(req.body));
})
vendorRouter.post('/rm', async (req,res)=>{
    return res.status(200).send( {ok: true, data : await vendorModel.expireVendor(req.body.vendorId)});
})
module.exports = vendorRouter;