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
    categoryTitle:{
        type:String,
        required:true,
    },
    vendors :[Object],
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
    expireDate:{
        type:Date,
        required:false
    },
    isVisible:{
        type:Boolean,
        required:false,
        default:true,
    },
    pictures:[String],
    description:{
        type:String,
        required:false
    }
})

module.exports = new mongoose.model('Product', productModel);