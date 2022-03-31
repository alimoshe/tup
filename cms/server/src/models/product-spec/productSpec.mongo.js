const mongoose = require('mongoose');
const productSpecSchema = new mongoose.Schema({
    specKey :{
        type : String,
        required:true,
    },
    specValue :{
        type:String,
        required : true,
    },
    productId : {
        type : Number,
        required : true
    }
});

module.exports = new mongoose.model('ProductSpec', productSpecSchema)