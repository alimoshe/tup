const mongoose = require('mongoose');
const productModel = new mongoose.Schema({
    productId : {
        type: Number,
        required: true,
    },
    title:{
        type:String,
        required: true,
    },
    categoryId:{
        type:Number,
        required:true,
    },
    vendorId:{
        type:Number,
        required:true,
    },
    rate:{
        type:Number
    },
    mainPrice:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number
    },
    pictures:[String],
    description:{
        type:String,
        required:false
    }
})

module.exports = new mongoose.model('Product', productModel);