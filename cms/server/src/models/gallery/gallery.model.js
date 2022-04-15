const mongoose = require('mongoose');
const galleryModel = new mongoose.Schema({
    itemId:{
        type: Number,
        required:true,
    },
    sectionId:{
        type:Number,
        required:true,
    },
    typeId:{
        type:Number,
        required:false,
    },
    title:{
        type:String,
        required:false,
    },
    path:{
       type:String,
       required:false,
       default:''
    },
    blobName:{
        type:String,
        required:true,
    },
    isMain:{
        type:Boolean,
        required:false,
        default:false,
    },
    expireDate:{
        type:Date,
        required:false
    },
    visible:{
        type:Boolean,
        required:false,
        default : true,
    }
})

module.exports = mongoose.model('Gallery', galleryModel);