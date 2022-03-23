const vendorModel = require('./vnedor.mongo');

async function getAllVendors(){
    return vendorModel.find({});
}

async function createVendor(vendor){
    return vendorModel.create(vendor);
}

module.exports = {
    getAllVendors,
}