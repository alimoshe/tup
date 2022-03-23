const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
    vendorId:{
        type : Number,
        required:true,
    },
    vendorTitle : {
        type:String,
        required:true
    },
})

module.exports = new mongoose.model('VendorModel', vendorSchema);