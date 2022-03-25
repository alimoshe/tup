const vendorModel = require('./vnedor.mongo');

async function getAllVendors(){
    return vendorModel.find({});
}

async function createVendor(vendor){
    return vendorModel.create(vendor);
}

async function getVendorById(_vendorId){
    return vendorModel.findOne({
        vendorId : _vendorId
    });
}
module.exports = {
    getAllVendors,
    getVendorById,
    createVendor
}