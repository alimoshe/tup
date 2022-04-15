const mongoose = require('mongoose');
const buffer = require("buffer");
const galleryModel = new mongoose.Schema({
    itemId:{
        type: Number,
        required:false,
    },
    sectionId:{
        type:Number,
        required:false,
    },
    typeId:{
        type:Number,
        required:false,
    },
    title:{
        type:String,
        required:false,
    },
    picturePath:{
       type:String,
       required:false,
       default:''
    },
    blobName:{
        type:String,
        required:false,
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
    },
    blobData :{
        type:Buffer
    }
})

module.exports = new mongoose.model('Gallery', galleryModel);