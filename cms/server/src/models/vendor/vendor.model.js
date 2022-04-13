const vendorModel = require('./vnedor.mongo');

async function getAllVendors(){
    return vendorModel.find({
        visible:true
    });
}

async function getVendorLength(){
    return vendorModel.countDocuments({});
}

async function createVendor(vendor){
    getVendorLength().then(len => {
        vendor.vendorId = len + 1;
        vendorModel.create(vendor);
    })
    return {ok : true};
}

async function getVendorById(_vendorId){
    return vendorModel.findOne({
        vendorId : _vendorId,
        visible  : true
    });
}

async function expireVendor(_vendorId) {
    return vendorModel.updateMany({vendorId : _vendorId},
        {expireDate : Date.now(), visible:false});
}
module.exports = {
    getAllVendors,
    getVendorById,
    getVendorLength,
    createVendor,
    expireVendor,
}