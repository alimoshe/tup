const mongoose = require('mongoose');

const productGalleryModel = new mongoose.Schema({
    itemId:{
        type:Number,
        required:true,
    },
    galleryItemId: {
        type: Number,
        required: true,
    },
    productItemId:{
        type:Number,
        required:true,
    },
    visible:{
        type:Boolean,
        required:false,
        default:true
    },
    expireDate : {
        type:Date,
        required:false,
    }
})

module.exports = new mongoose.model('ProductGallery', productGalleryModel);