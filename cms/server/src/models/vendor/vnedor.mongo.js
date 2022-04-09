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
    vendorAddress : {
        type:String,
        required :false
    },
    vendorEcoCode : {
        type:String,
        required:false
    },
    visible : {
        type:Boolean,
        required:false,
        default:true,
    },
    expireDate:{
        type:Date,
        required:false
    }
})

module.exports = new mongoose.model('VendorModel', vendorSchema);