const express = require('express');
const productSpecModel = require('../models/product-spec/productSpec.model');
const productSpecRouter = express.Router();

productSpecRouter.get('/:id', async (req, res) => {
    if(req.params.id) {
        const specs = await productSpecModel.getAllProductSpec(req.params.id);
        return res.status(200).send(specs);
    }
    res.status(403).send({ok:false});
})

productSpecRouter.post('/', async (req, res) => {
    console.log(req.body);
    if(req.body.mode === 'new'){
        const created = await productSpecModel.createProductSpec(req.body.data);
        return res.status(200).send({data : created, ok:true});
    }
    res.status(403).send({ok:false});
})

productSpecRouter.post('/rm', async (req, res)=> {

    if(req.body.id){
        const removedSpec = await productSpecModel.removeProductSpec(req.body.id);
        return res.status(200).send({ok:true, data : removedSpec});
    }
    res.status(403).send({ok:false});
})

module.exports = productSpecRouter;
