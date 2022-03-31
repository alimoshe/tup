const productSpecModel = require('./productSpec.mongo');
const mongoose = require('mongoose');
async function getAllProductSpec(prodId){
    return productSpecModel.find({
        productId : prodId
    },{
        _id:1,
        prodId : 1,
        specKey : 1,
        specValue : 1
    });
}

async function removeProductSpec(objectId){

    const objId = mongoose.Types.ObjectId(objectId);
    console.log(objId);
    return productSpecModel.remove({
        _id : objId
    })
}

async function createProductSpec(productSpec){
    return productSpecModel.create(productSpec);
}
module.exports = {
    getAllProductSpec,
    createProductSpec,
    removeProductSpec
}