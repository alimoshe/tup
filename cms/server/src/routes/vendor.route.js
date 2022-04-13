const express = require('express');
const vendorModel = require('../models/vendor/vendor.model');

const vendorRouter = express.Router();

vendorRouter.get('/', async (req, res) => {
    return res.status(200).send(await vendorModel.getAllVendors());
})

vendorRouter.get('/:id', async (req, res) => {
    if (req.params.id) {
        return res.status(200).send({ok: true, data: await vendorModel.getVendorById(req.params.id)});
    } else
        return res.status(403).send({ok: false, error: 'تامین کننده با کد داده شده یافت نشد'});
})

vendorRouter.post('/', async (req, res) => {
    return res.send(await vendorModel.createVendor(req.body));
})
vendorRouter.post('/rm', async (req, res) => {
    return res.status(200).send({ok: true, data: await vendorModel.expireVendor(req.body.vendorId)});
})
module.exports = vendorRouter;